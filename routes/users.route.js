const hapi = require('@hapi/hapi');
const faker = require('faker');


const basePath = '/api/v1/users';

const routes = (server) => {
  server.route({
    method: 'GET',
    path: basePath + '/{userId}/projects',
    handler: (request, h) => {
      const users = [];
      const { userId } = request.params;
      const { size } = request.query;
      const limit = size || 10;

      for (let index = 0; index < limit; index++) {
        users.push({
          userId,
          project: faker.name.jobDescriptor(),
          language: faker.name.jobTitle(),
        });
      }
      return users;
    }
  });

  server.route({
    method: 'GET',
    path: basePath + '/{userId}/projects/{projectId}',
    handler: (request, h) => {
      const users = [];
      const { userId, projectId } = request.params;

      users.push({
        userId,
        projectId,
        project: faker.name.jobDescriptor(),
        language: faker.name.jobTitle(),
      });
      return users;
    }
  });

  server.route({
    method: 'GET',
    path: basePath + '/{userId}/projects/{projectId}/time_coding',
    handler: (request, h) => {
      const users = [];
      const { userId, projectId } = request.params;

      users.push({
        userId,
        projectId,
        project: faker.name.jobDescriptor(),
        time: faker.time.recent(),
      });
      return users;
    }
  });

  server.route({
    method: 'GET',
    path: basePath + '/{userId}/projects/{projectId}/languages',
    handler: (request, h) => {
      const users = [];
      const { userId, projectId } = request.params;

      users.push({
        userId,
        projectId,
        project: faker.name.jobDescriptor(),
        language_1: faker.name.jobTitle(),
        language_2: faker.name.jobTitle(),
        language_3: faker.name.jobTitle(),
      });
      return users;
    }
  });

  server.route({
    method: 'GET',
    path: basePath + '/{userId}/projects/{projectId}/os',
    handler: (request, h) => {
      const users = [];
      const { userId, projectId } = request.params;

      users.push({
        userId,
        projectId,
        project: faker.name.jobDescriptor(),
        os: faker.name.suffix(),
      });
      return users;
    }
  });

  server.route({
    method: 'GET',
    path: basePath + '/{userId}/languages',
    handler: (request, h) => {
      const users = [];
      const { userId } = request.params;

      users.push({
        userId,
        language1: faker.name.jobTitle(),
        language2: faker.name.jobTitle(),
        language3: faker.name.jobTitle(),
      });
      return users;
    }
  });

  server.route({
    method: 'GET',
    path: basePath + '/{userId}/time_coding',
    handler: (request, h) => {
      const users = [];
      const { userId } = request.params;

      users.push({
        userId,
        time: faker.time.recent(),
      });
      return users;
    }
  });

  server.route({
    method: 'GET',
    path: basePath + '/{userId}/statistics',
    handler: (request, h) => {
      const users = [];
      const { userId } = request.params;

      users.push({
        userId,
        time: faker.time.recent(),
        project1: faker.name.jobDescriptor(),
        project2: faker.name.jobDescriptor(),
        project3: faker.name.jobDescriptor(),
        os1: faker.name.suffix(),
        os2: faker.name.suffix(),
        os3: faker.name.suffix(),
      });
      return users;
    }
  });

  server.route({
    method: 'GET',
    path: basePath + '/{userId}/statistics/os',
    handler: (request, h) => {
      const users = [];
      const { userId } = request.params;

      users.push({
        userId,
        os1: faker.name.suffix(),
        os2: faker.name.suffix(),
        os3: faker.name.suffix(),
      });
      return users;
    }
  });
}

module.exports = routes;
