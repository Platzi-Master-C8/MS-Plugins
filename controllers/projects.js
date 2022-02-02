'use strict'

const { projectsMock } = require('../utils/mocks/projects.mock')

// GET {userId}/configurations
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
  const userId = req.params.userId
  const userKey = req.headers.userkey

  try {
        const ObjectID = req.mongo.ObjectID;
        let findUserByKey = await req.mongo.db.collection('users').find({ key: userKey }).project({ name: false, email: false, key: false })
        const userByKey = await findUserByKey.next()

        if ( userByKey._id != userId ) { 
            throw 'invalid credentials'
        }
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

// PUT {userId}/projects
async function updateProjects(req, h) {
    const reqPayload = req.payload
    const userKey = req.headers.userkey
    const userId = req.params.userId

    try {
        const ObjectID = req.mongo.ObjectID

        let findUserByKey = await req.mongo.db.collection('users').find({ key: userKey }).project({ name: false, email: false, key: false })
        const userByKey = await findUserByKey.next()

        if ( ( userByKey == null ) || ( userByKey._id != userId ) ) { 
            throw 'invalid credentials'
        }


        const findProjects = await req.mongo.db.collection('projects').findOne( { userId: new ObjectID(userId) } )
        const newData = Object.entries(findProjects)

        const dataId = newData[2][1].findIndex(project => project.name == reqPayload.name )

        if(dataId == -1) {
            newData[2][1].push({
                id : new ObjectID(),
                ...reqPayload
            })
        }
        
        const newProject = Object.entries(newData[2][1][dataId])
        const newProjectData = Object.entries(reqPayload)

        newProjectData.map(data => {
            const newDataId = newProject.findIndex(currentData => currentData[0] == data[0])

            if(newDataId == -1) {
                newProject.push(data)
                return
            }

            if(data[0] == "time") {
                newProject[newDataId][1] += data[1]
                return
            }

            // update or add new data <<pending>>
            if(data[0] == "languages") {

                return
            }

            newProject[newDataId][1] = data[1]

            

        })
 
        newData[2][1][dataId] = Object.fromEntries(newProject)
        const updateProjects = await req.mongo.db.collection('projects').replaceOne({ userId: new ObjectID(userId) }, Object.fromEntries(newData))


        return `projects updated ${updateProjects}`
        
    } catch (error) {
        console.log(error)
        return error
    }

}


module.exports = {
  getProjects,
  createProject,
  updateProjects
}