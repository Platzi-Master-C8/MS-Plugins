'use strict'

const users = require('../controllers/users')


module.exports = [
    {
        method: 'GET',
        path: '/users',
        handler: users.getUser
    },
    {
        method: 'POST', 
        path: '/users',
        handler: users.createUser
    },
    {
        method: 'DELETE',
        path: '/users',
        handler: users.deleteUser
    }
]