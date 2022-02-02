'use strict'

const users = require('../controllers/users');
const { url } = require('../utils/mainRoute');

module.exports = [
    {
        method: 'GET',
        path: `${url}`,
        handler: users.getUser
    },
    {
        method: 'POST', 
        path: `${url}`,
        handler: users.createUser
    },
    {
        method: 'DELETE',
        path: '/users',
        handler: users.deleteUser
    }
]