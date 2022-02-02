'use strict'

const Hapi = require('@hapi/hapi');
const hapiMongo = require('hapi-mongodb');
const cors = require('cors');
const languagesRoutes = require('./routes/languages.route');
const config = require('./config').config;

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
        url: `mongodb+srv://${config.dbUser}:${config.dbPwd}@${config.dbHost}/${config.dbName}`,
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
