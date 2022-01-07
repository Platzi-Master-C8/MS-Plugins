'use strict'

const Hapi = require('@hapi/hapi');
const Mongo = require('hapi-mongodb')
const languagesRoutes = require('./routes/languages.route');
// const leadersRoutes = require('./routes/leaders.route')
// const usersRoutes = require('./routes/users.route')

// Server definition
const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
})

// Initializing Server
async function init() {
  try {

    await server.register({
      plugin: Mongo,
      options: {
        uri: 'mongodb+srv://{YOUR-USERNAME}:{YOUR-PASSWORD}@localhost',
        settings : {
          useUnifiedTopology: true
        },
        decorate: true
      }
    });

    server.route(languagesRoutes)
    // server.route(leadersRoutes)
    // server.route(usersRoutes)

    await server.start()
    console.log(`Server launched at: ${server.info.uri}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

init()
