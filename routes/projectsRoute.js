'use strict'

const projects = require('../controllers/projects');
const { url } = require('../utils/mainRoute');


module.exports = [
    {
        method: 'GET',
        path: `${url}/{userId}/projects`,
        handler: projects.getProjects
    },
    {
        method: 'POST',
        path: `${url}/{userId}/projects`,
        handler: projects.createProject
    },
    {
        method: 'PUT',
        path: `${url}/{userId}/projects`,
        handler: projects.updateProjects
    }
]