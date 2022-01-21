'use strict'
// GET '/users/{userId}/configurations'
async function getConfigurations (req, h) {
  //1.- recieve data of db
  //2.- get and send data with message of success or error
  const userId = req.params.userId

  console.log(userId)
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
    console.error(error + ' errorrrr')
  }

  return `send all config `
}

// POST '/users/{userId}/configurations'
async function createConfigurations (req, h) {
  //const config = req.payload
  //1.- validate data
  //2.- save data in db
  //3.- send message success or error
    const ObjectID = req.mongo.ObjectID;
    const userId = req.params.userId

    const newConfigurations = {
      userId: new ObjectID(userId),
      dataToShow: {
          developmentTime: true,
          languages: true,
          projectsWorked: true,
          operativeSystem: true
      },
      dataToTrack: {
          developmentTime: true,
          languages: true,
          projectsWorked: true,
          operativeSystem: true
      }
  }
    try {
        const createConfigurations = await req.mongo.db.collection('configurations').replaceOne(
            {
                userId: new ObjectID(userId)
            }, newConfigurations)
        await console.log(createConfigurations)

        return 'create configurations'
    } catch (error) {
        console.log(error + " errorrrrr")
    }

}

// GET configurations/dataToTrack
async function getDataToTrack (req, h) {
  //1.- recieve data of db
  //2.- send data and message of success or error
  return await h.response(`config about data to track`)
}

// PUT configurations/dataToTrack
async function updateDataToTrack (req, h) {
  //const config = req.payload
  //1.- validate data
  //2.- save data in db
  //3.- send message success or error

}


// GET configurations/{config}
async function getSpecificConfig (req, h) {
  //const config = req.params.config;
  //1.- review if the query is a valid data  
  //2.- get and send data and message of success or error
  return await h.response(`specific config about data to show/track`)

}

// PUT configurations/{config}
async function updatedSpecificConfig (req, h) {
  //const config = req.params.config;
  //1.- review if the query is a valid data  
  //2.- save data in db
  //3.- send message success or error
  return await h.response(`specific config about data to show/track`)

}



module.exports = {
  getConfigurations,
  createConfigurations,
  getDataToTrack,
  updateDataToTrack,
  getSpecificConfig,
  updatedSpecificConfig
}