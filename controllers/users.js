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

    let userDocId
    let usetStatisticsDocId
   
    let loginProv = parseProvider(sub)
    let data =  { 
        name: name,
        email: email,
        photo: picture ? picture : 'none',
        sub: sub ? loginProv : 'other provider'
    }

    data.key = createKey( name + email )
    try {
        //add data in own db 
        const findUserInOwnDb = await req.mongo.db[config.own].collection('users').findOne( 
            { 
                name: data.name,
                email: data.email,
                sub: data.sub
            }
        )
        if(findUserInOwnDb) {            
            throw Boom.badRequest("error, this user was created in own data base");
        } else if (!findUserInOwnDb){
            const saveUserOwnDb = await req.mongo.db[config.own].collection('users').insertOne(data)
            const saveUserStatisticsOwnDb = await req.mongo.db[config.own].collection('statistics').insertOne( { userId: saveUserOwnDb.insertedId, ...staticsBaseSchema } )
            userDocId = saveUserOwnDb.insertedId
            usetStatisticsDocId = saveUserStatisticsOwnDb.insertedId
        }

        //add data in tracking db
        data._id = userDocId
        const findUserInTrackingDb = await req.mongo.db[config.tracking].collection('users').findOne( 
            { 
                name: data.name,
                email: data.email,
                sub: data.sub
            }
        )
        if(findUserInTrackingDb){
            throw Boom.badRequest("error, this user was created in tacking data base");
        }else if(!findUserInTrackingDb) {
            const saveUserTrackingDb = await req.mongo.db[config.tracking].collection('users').insertOne(data)
            const saveUserStatisticsTrackingDb = await req.mongo.db[config.tracking].collection('statistics').insertOne( {  ...staticsBaseSchema, userId: userDocId, _id: usetStatisticsDocId }  )
        }
        
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

        //change key in own db
        let userInOwnDb = await req.mongo.db[config.own].collection('users').findOne( { 
            name: name,
            email: email,
            sub: loginProv
        } )
        if(!userInOwnDb) { 
            throw Boom.badRequest("error in get a user in own db");
        }
        let newKey = createKey( userInOwnDb.name + userInOwnDb.email )
        userInOwnDb.key = newKey

        const updateUserDataInOwnDb = await req.mongo.db[config.own].collection('users').replaceOne( { 
            name: name,
            email: email,
            sub: loginProv
        }, userInOwnDb)

        // change key in tracking db
        let userInTrackingDb = await req.mongo.db[config.tracking].collection('users').findOne( { 
            name: name,
            email: email,
            sub: loginProv
        } )
        if(!userInTrackingDb) { 
            throw Boom.badRequest("error in get a user in tracking db");
        }
        // const newKey = createKey( userInTrackingDb.name + userInTrackingDb.email )
        userInTrackingDb.key = newKey

        const updateUserDataInTrackingDb = await req.mongo.db[config.tracking].collection('users').replaceOne( { 
            name: name,
            email: email,
            sub: loginProv
        }, userInTrackingDb)

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