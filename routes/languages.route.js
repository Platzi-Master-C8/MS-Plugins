const hapi = require('@hapi/hapi');
const LanguagesService = require('./../services/languages.service')

const service = new LanguagesService();

const basePath = '/api/v1/languages';

const routes = (server) => {

  server.route({
    method: 'GET',
    path: basePath + '/',
    handler: async (request, h) => {
      return await service.find();
    }
  });

  server.route({
    method: 'GET',
    path: basePath + '/{langid}',
    handler: async (request, h) => {
      const { langid } = request.params;
      return await service.findOne(langid);
    }
  });

  server.route({
    method: 'GET',
    path: basePath + '/{langid}/leaderboard',
    handler: async (request, h) => {
      const { langid } = request.params;
      return await service.findLeader(langid);
    }
  });
};

module.exports = routes;
