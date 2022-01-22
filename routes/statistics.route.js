'use strict'

const statistics = require('../controllers/statistics');
const { url } = require('../utils/mainRoute');

module.exports = [
    {
        method: 'GET',
        path: `${url}/{userId}/statistics`,
        handler: statistics.getStatistics
    },
    {
        method: 'POST',
        path: `${url}/{userId}/statistics`,
        handler: statistics.createStatistics
    },
    {
        method: 'PUT',
        path: `${url}/{userId}/statistics`,
        handler: statistics.updateStatistics
    }
]