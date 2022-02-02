'use strict'

const Hapi = require('@hapi/hapi');
const hapiMongo = require('hapi-mongodb');
const usersRoutes = require('./routes/users.route');
const statisticsRoutes = require('./routes/statistics.route');
const projectsRoutes = require('./routes/projects.route');
const configurationsRoute = require('./routes/configurations.route');


// Server definition
const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
})

// Initializing Server
async function init() {
  try {

    await server.register({
      plugin: hapiMongo,
      options: {
        url: 'mongodb+srv://<user>:<password>@cluster0.7kiey.mongodb.net/<dbCollectionName>?retryWrites=true&w=majority',
        settings: {
          useUnifiedTopology: true
        },
        decorate: true
      }
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
