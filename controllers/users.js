'use strict'

const config = require('../config/index').config;
const createKey = require('../utils/createKey');
const { configBaseSchema } = require('../models/configurations');
const { staticsBaseSchema } = require('../models/statistics');
const { projectsBaseSchema } = require('../models/projects');
const Jwt = require('@hapi/jwt');
const parseProvider = require('../utils/auth/parseProvider');
const decodeJWT = require('../utils/auth/decodeJWT');
const Boom = require('@hapi/boom');


// GET /users
async function getUser (req, h) {
    let jwtPayloadDecoded = decodeJWT(req.headers.authorization)
    const { name, email, picture, sub } = jwtPayloadDecoded
   
    let loginProv = sub ? parseProvider(sub) : 'other provider'

    try {
        const user = await req.mongo.db[config.own].collection('users').findOne( { 
            name: name,
            email: email,
            sub: loginProv
        })
        if(!user) {
            throw Boom.badRequest("error in get a user");
        }

        return user
        
    } catch(error) {
        console.log(error)
        return(error)
    }

}

// GET /users/id
async function getUserId (req, h) {
    const userKey = req.headers.userkey

    try {
        const user = await req.mongo.db[config.own].collection('users').findOne( { 
            key: userKey
        })
        if(!user) {
            throw Boom.badRequest("error in get a user");
        }

        return user._id
        
    } catch(error) {
        console.log(error)
        return(error)
    }

}

// POST /users
async function createUser (req, h) {
    let jwtPayloadDecoded = decodeJWT(req.headers.authorization)
    const { name, email, picture, sub } = jwtPayloadDecoded
   
    let loginProv = parseProvider(sub)
    const data =  { 
        name: name,
        email: email,
        photo: picture ? picture : 'none',
        sub: sub ? loginProv : 'other provider'
    }

    data.key = createKey( name + email )
    try {
        const findUser = await req.mongo.db[config.own].collection('users').findOne( 
            { 
                name: data.name,
                email: data.email,
                sub: data.sub
            }
        )
        if(findUser) {            
            throw Boom.badRequest("error, this user was created in the data base");
        }

        const saveUserData = await req.mongo.db[config.own].collection('users').insertOne(data)
        const saveUserStatisticsData = await req.mongo.db[config.own].collection('statistics').insertOne( { userId: saveUserData.insertedId, ...staticsBaseSchema } )
        
        // deprecated collections
        // const saveUserProjectsData = await req.mongo.db[config.own].collection('projects').insertOne( { userId: saveUserData.insertedId, ...projectsBaseSchema } )
        // const saveUserConfigData = await req.mongo.db[config.own].collection('configurations').insertOne( { userId: saveUserData.insertedId, ...configBaseSchema } )


        return 'successfully saved Data'
    } catch(error) {
        console.log(error)
        return error
    }
    
}

// PATCH /users/userKey
async function updateKey (req, h) {
    let jwtPayloadDecoded = decodeJWT(req.headers.authorization)
    const { name, email, sub } = jwtPayloadDecoded
    let loginProv = sub ? parseProvider(sub) : 'other provider'

    
    try {
        let user = await req.mongo.db[config.own].collection('users').findOne( { 
            name: name,
            email: email,
            sub: loginProv
        } )
        if(!user) { 
            throw Boom.badRequest("error in get a user");
        }
        const newKey = createKey( user.name + user.email )
        user.key = newKey

        const updateUserData = await req.mongo.db[config.own].collection('users').replaceOne( { 
            name: name,
            email: email,
            sub: loginProv
        }, user)


        return {
            message: 'successfully saved Data',
            newKey: newKey
        }
    } catch(error) {
        console.log(error)
        return error
    }
    
}

// DELETE /users
async function deleteUser (req, h) {
    //1.- validate Data
    //2.- delete in db
    //3.- send message of success or error
    const key = {

    }

    try {
        // if(typeof key == 'object' && Object.keys(key).length > 0) {
        //     const result = await req.mongo.db[config.own].collection('users').deleteOne( key )
        // }
    } catch (error) {
        
    }
}
  
  


module.exports = {
    getUser,
    getUserId,
    createUser,
    updateKey,
    deleteUser
}