'use strict'

const Hapi = require('@hapi/hapi');
const hapiMongo = require('hapi-mongodb');
const config = require('./config').config;
const usersRoutes = require('./routes/usersRoute');
const statisticsRoutes = require('./routes/statisticsRoute');
const projectsRoutes = require('./routes/projectsRoute');
const configurationsRoute = require('./routes/configurationsRoute');

const Jwt = require('@hapi/jwt');



const origins = [
  '*',
]

const dataBases = {
  own: 0,
  tracking: 1
}


// Server definition
const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: '0.0.0.0',
  routes: {
    cors: {
      origin: origins,
      additionalHeaders: ['userKey'],
    },
  }
})

// Initializing Server
async function init() {
  try {

  

    await server.register({
      plugin: hapiMongo,
      options: [
        // own dataBase
        {
          url: `mongodb+srv://${config.ownDbUser}:${config.ownDbPwd}@cluster0.7kiey.mongodb.net/${config.ownDbCollectionName}`,
          settings: {
            useUnifiedTopology: true
          },
          decorate: true
        },
        // tracking Data base
        {
          url: `mongodb+srv://${config.trackingDbUser}:${config.trackingDbPwd}@cluster0.nyfug.mongodb.net/${config.trackingDbCollectionName}?retryWrites=true&w=majority`,
          settings: {
            useUnifiedTopology: true
          },
          decorate: true
        },
      ]
    });

    await server.register(Jwt);
    
    server.auth.strategy('auth0_jwt', 'jwt', {
      keys: "supersecretkey",
      verify: {
        aud: 'https://platzimaster.us.auth0.com/api/v2/',
        iss: 'https://platzimaster.us.auth0.com/',
        sub: false,
        // exp: false,
      },
      validate: (artifacts, request, h) => {
        // console.log(artifacts.decoded.payload);
        return {
          isValid: true,
          // credentials: { user: artifacts.decoded.payload.user }
        };
      },
    });

    server.route(usersRoutes)
    server.route(statisticsRoutes)

    // Deprecated routes
    // server.route(projectsRoutes)
    // server.route(configurationsRoute)


    await server.start()
    
    
    console.log(`Server launched at: ${server.info.uri}`)

  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

init()


module.exports = { dataBases }