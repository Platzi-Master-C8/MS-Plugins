'use strict'


// GET user/
async function getUser (req, h) {
    //1.- recieve data of db
    //2.- get and send data with message of success or error
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
}

// DELETE user/
async function deleteUser (req, h) {
    //1.- validate Data
    //2.- delete in db
    //3.- send message of success or error
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