'use strict'

const configurations = require('../controllers/configurations');

module.exports = [
    {
        method: 'GET',
        path: '/users/{userId}/configurations',
        handler: configurations.getConfigurations
    },
    {
        method: 'POST',
        path: '/users/{userId}/configurations',
        handler: configurations.createConfigurations
    }
]