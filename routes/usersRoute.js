'use strict'

const users = require('../controllers/users');
const { url } = require('../utils/mainRoute');

module.exports = [
    {
        method: 'GET',
        path: `${url}`,
        config: {
            auth: {
                strategy: 'auth0_jwt'
            }
        },
        handler: users.getUser
    },
    {
        method: 'POST', 
        path: `${url}`,
        config: {
            auth: {
                strategy: 'auth0_jwt'
            }
        },
        handler: users.createUser
    },
    {
        method: 'PATCH', 
        path: `${url}/userKey`,
        config: {
            auth: {
                strategy: 'auth0_jwt'
            }
        },
        handler: users.updateKey
    },
    {
        method: 'DELETE',
        path: '/users',
        handler: users.deleteUser
    }
]