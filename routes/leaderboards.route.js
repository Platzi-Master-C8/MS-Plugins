const hapi = require('@hapi/hapi');

const LeaderboardsService = require('./../services/leaderboards.service');
const service = new LeaderboardsService();

const basePath = '/api/v1/leaderboards';

const routes = (server) => {
  server.route({
    method: 'GET',
    path: basePath + '/',
    handler: async (request, h) => {
      return await service.find();
    }
  });
}

module.exports = routes;
