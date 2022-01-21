'use strict'
const createKey = require('../utils/createKey');

// GET user/
async function getUser (req, h) {
    //1.- recieve data of db
    //2.- get and send data with message of success or error
    const userKey = req.query.userKey
    const userCredentials = "example"

    try {
        let key = userKey ? { key: userKey } : { name: userCredentials }
        const user = await req.mongo.db.collection('users').findOne( key )
        if(!user) {
            throw "error in get a user";
        }

        // await console.log(user)

        return user
        
    } catch(error) {
        console.log(error + " errorrrrr")
    }
 
}
  
// PUT user/
async function updateUser (req, h) {
    //1.- validate Data
    //2.- update in db
    //3.- send message of success or error
}

// POST user/
async function createUser (req, h) {
    //1.- validate Data
    //2.- save in db
    //3.- send message of success or error
    // const user = req.payload
    const user = {
        name: 'jito jito',
        email: 'something@gmail.com',
         
    }

    user.key = createKey(user.name + user.email)
    console.log(user)
    // const userStatistics = {
    //     // _id: 
    //     userId: user.key,
    //     // languages: []
    //     // development: {

    //     // }
    //     // os: []
    // }
    // const userProjects = {
    //     // _id: 
    //     userId: user.key
    //     // projects: []
    // }
    try {
        const findUser = await req.mongo.db.collection('users').findOne( user )
        if(findUser) {
            throw 'error, this users was created'
        }
        
        const saveUserData = await req.mongo.db.collection('users').insertOne(user)
        const saveUserStatisticsData = await req.mongo.db.collection('statistics').insertOne(
            {
                userId: saveUserData.insertedId
            }
        )
        const saveUserProjectsData = await req.mongo.db.collection('projects').insertOne(
            {
                userId: saveUserData.insertedId
            }
        )
        const saveUserConfigData = await req.mongo.db.collection('configurations').insertOne(
            {
                userId: saveUserData.insertedId
            }
        )
       
        await console.log(saveUserConfigData)
        
        // await console.log(saveUserStatisticsData)
        // await console.log(saveUserProjectsData)

        return 'saveData'
    } catch(error) {
        console.log(error)
        return error
    }
    

}

// DELETE user/
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
  
// GET user/{key}
async function getSpecificData (req, h) {
    //const config = req.params.key;
    //1.- review if the query is a valid data  
    //2.- get and send data and message of success or error
    
}

// PUT user/{key}
async function updateSpecificData (req, h) {
    //const config = req.params.key;
    //1.- review if the query is a valid data  
    //2.- get and send data and message of success or error
    
}
  


module.exports = {
    getUser,
    updateUser,
    createUser,  
    deleteUser,
    getSpecificData,
    updateSpecificData
}