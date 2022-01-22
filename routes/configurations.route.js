'use strict'

const configurations = require('../controllers/configurations');
const { url } = require('../utils/mainRoute');

module.exports = [
    {
        method: 'GET',
        path: `${url}/{userId}/configurations`,
        handler: configurations.getConfigurations
    },
    {
        method: 'POST',
        path: `${url}/{userId}/configurations`,
        handler: configurations.createConfigurations
    }
]