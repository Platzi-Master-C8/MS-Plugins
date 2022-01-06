'use strict'


// GET statistics/
async function getStatistics (req, h) {
    //1.- recieve data of db
    //2.- get and send data with message of success or error
}
  
// PUT statistics/
async function updateStatistics (req, h) {
    //1.- validate Data
    //2.- update in db
    //3.- send message of success or error
}


  
// GET statistics/{key}
async function getSpecificStatistic (req, h) {
    //const config = req.params.key;
    //1.- review if the query is a valid data  
    //2.- get and send data and message of success or error
    
}

// PUT statistics/{key}
async function updateSpecificStatistic (req, h) {
    //const config = req.params.key;
    //1.- review if the query is a valid data  
    //2.- get and send data and message of success or error
    
}

// POST statistics/
async function createStatistic (req, h) {
    //1.- validate Data
    //2.- save in db
    //3.- send message of success or error
}
  


module.exports = {
    getStatistics,
    updateStatistics,
    getSpecificStatistic,  
    updateSpecificStatistic,
    createStatistic,

}