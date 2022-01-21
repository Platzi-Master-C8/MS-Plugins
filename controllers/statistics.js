'use strict'


// GET {userId}/statistics/
async function getStatistics (req, h) {
    //1.- recieve data of db
    //2.- get and send data with message of success or error
    const userId = req.params.userId
    try {
        const ObjectID = req.mongo.ObjectID;
        const statistics = await req.mongo.db.collection('statistics').findOne( 
            {
                userId: new ObjectID(userId)
            }
        )
        if(!statistics) {
            throw "error in get statistics";
        }

        await console.log(statistics)

        return statistics
        
    } catch(error) {
        console.log(error + " errorrrrr")
    }
 
}

// // PUT {userId}/statistics/
// async function updateStatistics (req, h) {
//     //1.- validate Data
//     //2.- update in db
//     //3.- send message of success or error
//     const userId = req.params.userId
//     try {
//         const ObjectID = req.mongo.ObjectID;
//         const 
//     } catch (error) {
//         console.log(error + " errorrrrr")
//     }
// }

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

// POST {userId}/statistics/
async function createStatistic (req, h) {
    // 1.- validate Data
    // 2.- save in db
    // 3.- send message of success or error
    const ObjectID = req.mongo.ObjectID;
    const userId = req.params.userId

    const newStatistics = {
        userId: new ObjectID(userId),
        lastTracking: new Date(),
        langueages: [
          { name: 'JS', time: 12.5 },
          { name: 'Rust', time: 25 },
          { name: 'php', time: 25 },
          { name: 'Java', time: 12.5 },
          { name: 'Python', time: 25 }
        ],
        development: { totalTime: 52545 },
        os: [
          { name: 'windows', time: 545 },
          { name: 'linux', time: 545 },
          { name: 'mac', time: 545 }
        ]
    }
    try {
        const createStatistics = await req.mongo.db.collection('statistics').replaceOne(
            {
                userId: new ObjectID(userId)
            }, newStatistics)
        await console.log(createStatistics)

        return 'create statistics'
    } catch (error) {
        console.log(error + " errorrrrr")
    }

}
  


module.exports = {
    getStatistics,
    // updateStatistics,
    getSpecificStatistic,  
    updateSpecificStatistic,
    createStatistic,

}