'use strict'

const Hapi = require('@hapi/hapi');
const hapiMongo = require('hapi-mongodb');
const config = require('./config').config;
const usersRoutes = require('./routes/usersRoute');
const statisticsRoutes = require('./routes/statisticsRoute');
const projectsRoutes = require('./routes/projectsRoute');
const configurationsRoute = require('./routes/configurationsRoute');

const origins = [
  '*',
]


// Server definition
const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: '0.0.0.0',
  routes: {
    cors: {
      origin: origins,
      additionalExposedHeaders: ['Accept'],
    },
  }
})

// Initializing Server
async function init() {
  try {
    console.log(config.dbUser, config.dbPwd, config.dbCollectionName)
    await server.register({
      plugin: hapiMongo,
      options: {
        url: `mongodb+srv://${config.dbUser}:${config.dbPwd}@cluster0.7kiey.mongodb.net/${config.dbCollectionName}`,
        settings: {
          useUnifiedTopology: true
        },
        decorate: true
      },
    });

    server.route(usersRoutes)
    server.route(statisticsRoutes)
    server.route(projectsRoutes)
    server.route(configurationsRoute)


    await server.start()
    console.log(`Server launched at: ${server.info.uri}`)

  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

init()
