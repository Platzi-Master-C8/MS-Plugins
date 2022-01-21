'use strict'

const test = require('../controllers/test')


module.exports = [
    {
        method: 'GET',
        path: '/test/{name}',
        handler: test.createAllCollections
    }
]