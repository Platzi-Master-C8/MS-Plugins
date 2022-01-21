'use strict'

const projects = require('../controllers/projects');

module.exports = [
    {
        method: 'GET',
        path: '/users/{userId}/projects',
        handler: projects.getProjects
    },
    {
        method: 'POST',
        path: '/users/{userId}/projects',
        handler: projects.createProject
    }
]