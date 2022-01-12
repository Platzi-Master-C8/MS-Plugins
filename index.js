'use strict'

const Hapi = require('@hapi/hapi');
const hapiMongo = require('hapi-mongodb')
const languagesRoutes = require('./routes/languages.route');

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
        url: 'mongodb+srv://<username>:<password>@cluster0.nyfug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        settings: {
          useUnifiedTopology: true
        },
        decorate: true
      }
    });

    server.route(languagesRoutes)

    await server.start()
    console.log(`Server launched at: ${server.info.uri}`)

  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

init()
