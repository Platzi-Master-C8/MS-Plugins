'use strict'


// GET projects/
async function getProjects (req, h) {
  //1.- recieve data of db
  //2.- get and send data with message of success or error
}

// PUT projects/
async function updateProjects (req, h) {
    //1.- validate Data
    //2.- save in db
    //3.- send message of success or error
}

// GET projects/{project}
async function getSpecificProject (req, h) {
  //const config = req.params.config;
  //1.- review if the query is a valid data  
  //2.- get and send data and message of success or error
  
}

// PUT projects/{project}
async function updateSpecificProject (req, h) {
    //1.- validate Data
    //2.- save in db
    //3.- send message of success or error
}

// POST projects/
async function createProject (req, h) {
  //1.- validate Data
  //2.- save in db
  //3.- send message of success or error
}

module.exports = {
  getProjects,
  updateProjects,
  getSpecificProject,  
  updateSpecificProject,
  createProject
}