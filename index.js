'use strict'

const Hapi = require('@hapi/hapi');
const hapiMongo = require('hapi-mongodb');
const usersRoutes = require('./routes/users.route');
const statisticsRoutes = require('./routes/statistics.route');
const projectsRoutes = require('./routes/projects.route');
const configurationsRoute = require('./routes/configurations.route');

const testRoute = require('./routes/test.route');

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
<<<<<<< HEAD
        url: 'mongodb+srv://db_user_platzivideos:gxZR778nWCU4@cluster0.7kiey.mongodb.net/squadplugins?retryWrites=true&w=majority',
=======
        url: 'mongodb+srv://<userName>:<password>@cluster0.7kiey.mongodb.net/<collection>?retryWrites=true&w=majority',
>>>>>>> fe94218e403600cc17d6649f7fec911c91016043
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

    server.route(testRoute)

    await server.start()
    console.log(`Server launched at: ${server.info.uri}`)

  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

init()
