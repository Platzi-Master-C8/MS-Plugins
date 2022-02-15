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
        method: 'PATCH', 
        path: `${url}/userKey`,
        handler: users.updateKey
    },
    {
        method: 'DELETE',
        path: '/users',
        handler: users.deleteUser
    }
]