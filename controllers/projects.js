'use strict'

const { projectsMock } = require('../utils/mocks/projects.mock')

// GET {userId}/projects
async function getProjects (req, h) {
  const userId = req.params.userId

  try {
      const ObjectID = req.mongo.ObjectID;
      const projects = await req.mongo.db.collection('projects').findOne( { userId: new ObjectID(userId) } )
      if(!projects) {
          throw "error in get projects";
      }

      return projects
      
  } catch(error) {
      console.log(error)
      return error
  }

}

// POST {userId}/projects
async function createProject (req, h) {
  const ObjectID = req.mongo.ObjectID;
  const userId = req.params.userId
  
  try {
      const createProjects = await req.mongo.db.collection('projects').replaceOne(
          {
              userId: new ObjectID(userId)
          }, { userId: new ObjectID(userId), ...projectsMock })
      await console.log(createProjects)

      return `projects created ${createProjects}`
  } catch (error) {
      console.log(error)
      return error
  }
  
}

module.exports = {
  getProjects,
  createProject
}