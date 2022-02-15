'use strict'

const createKey = require('../utils/createKey');
const { configBaseSchema } = require('../models/configurations');
const { staticsBaseSchema } = require('../models/statistics');
const { projectsBaseSchema } = require('../models/projects');

// GET /users
async function getUser (req, h) {
    const userKey = req.headers.userkey
    try {
        const user = await req.mongo.db.collection('users').findOne( { key: userKey } )
        if(!user) {
            throw "error in get a user";
        }

        return user
        
    } catch(error) {
        console.log(error)
        return(error)
    }
 
}

// POST /users
async function createUser (req, h) {
    const data = req.payload
    data.key = createKey( data.name + data.email )
    
    try {
        const findUser = await req.mongo.db.collection('users').findOne( 
            { 
                name: data.name,
                email: data.email
            }
        )
        if(findUser) {
            throw 'error, this user was created in the data base'
        }
        

        const saveUserData = await req.mongo.db.collection('users').insertOne(data)
        const saveUserStatisticsData = await req.mongo.db.collection('statistics').insertOne( { userId: saveUserData.insertedId, ...staticsBaseSchema } )
        const saveUserProjectsData = await req.mongo.db.collection('projects').insertOne( { userId: saveUserData.insertedId, ...projectsBaseSchema } )
        const saveUserConfigData = await req.mongo.db.collection('configurations').insertOne( { userId: saveUserData.insertedId, ...configBaseSchema } )


        return 'successfully saved Data'
    } catch(error) {
        console.log(error)
        return error
    }
    
}

// PATCH /users/userKey
async function updateKey (req, h) {
    const userKey = req.headers.userkey
    
    try {
        let user = await req.mongo.db.collection('users').findOne( { key: userKey } )
        if(!user) {
            throw "error in get a user";
        }
        const newKey = createKey( user.name + user.email )
        user.key = newKey

        const updateUserData = await req.mongo.db.collection('users').replaceOne(  { key: userKey }, user)


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
        if(typeof key == 'object' && Object.keys(key).length > 0) {
            const result = await req.mongo.db.collection('users').deleteOne( key )
        }
    } catch (error) {
        
    }
}
  
  


module.exports = {
    getUser,
    createUser,
    updateKey,
    deleteUser
}