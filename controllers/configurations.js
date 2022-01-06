'use strict'
// GET configurations/dataToShow
async function getDataToShow (req, h) {
  //1.- recieve data of db
  //2.- get and send data with message of success or error
  return await h.response(`all config about data to show`)
}

// PUT configurations/dataToShow
async function updateDataToShow (req, h) {
  //const config = req.payload
  //1.- validate data
  //2.- save data in db
  //3.- send message success or error
  
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
  getDataToShow,
  updateDataToShow,
  getDataToTrack,
  updateDataToTrack,
  getSpecificConfig,
  updatedSpecificConfig
}