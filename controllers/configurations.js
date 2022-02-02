'use strict'

const { configurationsMock } = require('../utils/mocks/configurations.mock')

// GET {userId}/configurations
async function getConfigurations (req, h) {
  const userId = req.params.userId

  try {
    const ObjectID = req.mongo.ObjectID
    const configurations = await req.mongo.db.collection('configurations').findOne({
      userId: new ObjectID(userId)
    })
    if(!configurations) {
      throw 'error in get configurations'
    }

    return configurations
  } catch (error) {
    console.error(error)
    return error
  }

}

// POST {userId}/configurations
async function createConfigurations (req, h) {
    const userId = req.params.userId
    const userKey = req.headers.userkey

    try {
        const ObjectID = req.mongo.ObjectID;
        let findUserByKey = await req.mongo.db.collection('users').find({ key: userKey }).project({ name: false, email: false, key: false })
        const userByKey = await findUserByKey.next()

        if ( ( userByKey == null ) || ( userByKey._id != userId ) ) { 
          throw 'invalid credentials'
        }
        const createConfigurations = await req.mongo.db.collection('configurations').replaceOne(
            {
                userId: new ObjectID(userId)
            }, { userId: new ObjectID(userId), ...configurationsMock })
        await console.log(createConfigurations)

        return 'create configurations'
    } catch (error) {
        console.log(error)
        return error
    }

}

async function updateConfigurations (req, h) {
  const userId = req.params.userId
  const userKey = req.headers.userkey
  const reqPayload = req.payload

  try {
    const ObjectID = req.mongo.ObjectID
    let findUserByKey = await req.mongo.db.collection('users').find({ key: userKey }).project({ name: false, email: false, key: false })
    const userByKey = await findUserByKey.next()

    if ( ( userByKey == null ) || ( userByKey._id != userId ) ) { 
      throw 'invalid credentials'
    }
    
    const updateConfigurations = req.mongo.db.collection('configurations').replaceOne( { userId: new ObjectID(userId) }, { userId: new ObjectID(userId), ...reqPayload } )

    if (updateConfigurations == null) {
      throw 'error in update configurations'
    }

    return `configurations updated ${updateConfigurations}`
  } catch (error) {
    console.log(error)
    return error
  }



}

module.exports = {
  getConfigurations,
  createConfigurations,
  updateConfigurations
}