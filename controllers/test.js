'use strict'

// create collection
async function createCollection (req, h) {
    //1.- recieve data of db
    //2.- get and send data with message of success or error
    const newCollection = await req.mongo.db.createCollection('holi')
    await console.log(newCollection)

    return 'collection created'
 
}


   
const fakeUser1 = {
    name:"example",
    email:"example@example.com",
    key:"ksjeucdsjdfuikfh"
     
}
const fakeUser2 = {
    name: "jito jito",
    email:"something@gmail.com",
    key: "fa0021fee51d910ae10f70761acd7c77de6768e2"
}

async function createAllCollections (req, h) {
    const name = req.params.name
    const usersCollection = await req.mongo.db.createCollection(name)
    

   
    return 'collections created'
}
  

module.exports = {
    createCollection,
    createAllCollections
}