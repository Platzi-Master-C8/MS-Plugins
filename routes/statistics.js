'use strict'

const statistics = require('../controllers/statistics');

module.exports = [
    {
        method: 'GET',
        path: '/users/{userId}/statistics',
        handler: statistics.getStatistics
    },
    {
        method: 'POST',
        path: '/users/{userId}/statistics',
        handler: statistics.createStatistic
    }
]