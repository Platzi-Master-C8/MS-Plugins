'use strict'

const { statisticsMock } = require('../utils/mocks/statistics.mock');

// GET {userId}/statistics
async function getStatistics (req, h) {
    const userId = req.params.userId
    try {
        const ObjectID = req.mongo.ObjectID;
        const statistics = await req.mongo.db.collection('statistics').findOne( { userId: new ObjectID(userId) } )
        if(!statistics) {
            throw "error in get statistics";
        }

        return statistics
        
    } catch(error) {
        console.log(error)
        return error
    }
 
}

// PUT {userId}/statistics
async function updateStatistics (req, h) {
    const userId = req.params.userId
    const reqPayload = req.payload ? Object.entries(req.payload) : null
    const queryData = req.query.data
    const userKey = req.headers.userkey

    try {
        const ObjectID = req.mongo.ObjectID
        let findUserByKey = await req.mongo.db.collection('users').find({ key: userKey }).project({ name: false, email: false, key: false })
        const userByKey = await findUserByKey.next()

        if ( userByKey._id != userId ) { 
            throw 'invalid credentials'
        }
        if(!queryData) {
            throw 'add query data to update the information'
        }
        if(!reqPayload) {
            throw 'add body data to update the information'
        }
        
        const statistics = await req.mongo.db.collection('statistics').findOne({ userId: new ObjectID(userId) }) 
        const newData = await Object.entries(statistics)
        
        await queryData.forEach(element => {
            let indexCurrentData = newData.findIndex( array => array[0] == element )
            let indexNewData = reqPayload.findIndex( array => array[0] == element )

            if (indexCurrentData == -1 ||  indexNewData == -1) {
                return 'no match between query and statistics document or the new data'
            } 

            if(element == 'langueages' || element == 'os') {
                reqPayload[indexNewData][1].forEach(data => {
                    let index = newData[indexCurrentData][1].findIndex( actualData => actualData["name"] == data["name"] )
                    if(index == -1) {
                        newData[indexCurrentData][1].push(
                            data
                        )
                        return
                    }
    
                    newData[indexCurrentData][1][index] = {
                        ...newData[indexCurrentData][1][index],
                        time: newData[indexCurrentData][1][index].time + data.time
                    }
    
                })
            }

            if(element == 'development') {
                newData[indexCurrentData][1].totalTime = newData[indexCurrentData][1].totalTime + reqPayload[indexNewData][1].totalTime

            }
           
        });

        const updateStatistics = await req.mongo.db.collection('statistics').replaceOne( { userId: new ObjectID(userId) }, Object.fromEntries(newData))
        return `statistics updated ${updateStatistics}`



    } catch (error) {
        console.log(error)
        return error
    }
    
   
}

// POST {userId}/statistics
async function createStatistics (req, h) {
    const userId = req.params.userId
    const userKey = req.headers.userkey

    try {
        const ObjectID = req.mongo.ObjectID
        let findUserByKey = await req.mongo.db.collection('users').find({ key: userKey }).project({ name: false, email: false, key: false })
        const userByKey = await findUserByKey.next()

        if ( userByKey._id != userId ) { 
            throw 'invalid credentials'
        }
        const createStatistics = await req.mongo.db.collection('statistics').replaceOne(
            {
                userId: new ObjectID(userId)
            }, { userId: new ObjectID(userId), ...statisticsMock })

        return `create statistics ${createStatistics}`
    } catch (error) {
        console.log(error)
        return error
    }

}
  


module.exports = {
    getStatistics,
    updateStatistics,
    createStatistics
}