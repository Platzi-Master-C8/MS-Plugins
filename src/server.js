const hapi = require('@hapi/hapi');
const faker = require('faker');


const leaderboardRoutes = require('../routes/leaderboards.route');
const languagesRoutes = require('../routes/languages.route');
const usersRoutes = require('../routes/users.route');

const init = async () => {
  const server = new hapi.Server({
    port: 3000,
    host: 'localhost',
  });

  leaderboardRoutes(server);
  languagesRoutes(server);
  usersRoutes(server);

  await server.start();
  console.log(`Server running on: ${server.info.uri}`);

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return `Hello, my server in hapi`;
    }
  });
}

init();
