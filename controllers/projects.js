'use strict'


// GET projects/
async function getProjects (req, h) {
  //1.- recieve data of db
  //2.- get and send data with message of success or error
  const userId = req.params.userId
  try {
      const ObjectID = req.mongo.ObjectID;
      const projects = await req.mongo.db.collection('projects').findOne( 
          {
              userId: new ObjectID(userId)
          }
      )
      if(!projects) {
          throw "error in get projects";
      }

      await console.log(projects)

      return projects
      
  } catch(error) {
      console.log(error + " errorrrrr")
  }

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

// POST '/users/{userId}/projects'
async function createProject (req, h) {
  //1.- validate Data
  //2.- save in db
  //3.- send message of success or error
  const ObjectID = req.mongo.ObjectID;
  const userId = req.params.userId

  const newProjects = {
    userId: new ObjectID(userId),
    projects: [
      {
        id: 0,
        name: 'Best project',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate lorem in pellentesque imperdiet. Sed euismod vel tortor at tincidunt.',
        link: 'link',
        time: 500,
        languages: [Array],
        os: 'linux'
      },
      {
        id: 1,
        name: 'GraphiCal',
        description: 'First technical text of Platzi Master; the creation of a basic graphing calculator',
        link: 'https://github.com/IrvingJuarez/GraphiCal',
        time: 500,
        lenguages: [Array],
        os: 'Linux'
      },
      {
        id: 2,
        name: 'equation-solver',
        description: 'Program able to solve one-variable linear equations',
        link: 'https://github.com/IrvingJuarez/equation-solver',
        time: 250,
        lenguages: [Array],
        os: 'Linux'
      },
      {
        id: 3,
        name: 'Pacman',
        description: 'The classical Arcade Game made out of html, css and plain js',
        link: 'https://github.com/IrvingJuarez/Pacman',
        time: 120,
        lenguages: [Array],
        os: 'Linux'
      },
      {
        id: 4,
        name: 'spelling-trainer',
        description: "Program to enhance english students's spelling skills",
        link: 'https://github.com/IrvingJuarez/spelling-trainer',
        time: 720,
        lenguages: [Array],
        os: 'Linux'
      }
    ]
  }
  try {
      const createProjects = await req.mongo.db.collection('projects').replaceOne(
          {
              userId: new ObjectID(userId)
          }, newProjects)
      await console.log(createProjects)

      return 'create projects'
  } catch (error) {
      console.log(error + " errorrrrr")
  }
}

module.exports = {
  getProjects,
  updateProjects,
  getSpecificProject,  
  updateSpecificProject,
  createProject
}