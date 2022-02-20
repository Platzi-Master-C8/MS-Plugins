'use strict'

const config = require('../config/index').config;
const { response } = require('@hapi/hapi/lib/validation');
const { statisticsMock } = require('../utils/mocks/statistics.mock');
const getTotalDevelopment = require('../utils/statistics/getTotalDevelopment');
const getTotalLanguages = require('../utils/statistics/getTotalLanguages');
const getWorkspaces = require('../utils/statistics/getWorkspaces');

// GET {userId}/statistics
async function getStatistics (req, h) {
    const userId = req.params.userId
    try {
        const ObjectID = req.mongo.ObjectID;
        const statisticsDoc = await req.mongo.db[config.own].collection('statistics').findOne( { userId: new ObjectID(userId) } )
        
        if(!statisticsDoc) {
            throw Boom.badRequest("error in get statistics");
        }
        
        const statisticsDocArr = Object.entries(statisticsDoc)
        let data
        let languagesIndex = statisticsDocArr.findIndex(element => element[0] == 'languages')
        console.log(statisticsDocArr[languagesIndex])
        if(statisticsDocArr[languagesIndex][1].length != 0) {
            let statisticsLenguage = getTotalLanguages(statisticsDocArr)
            let statisticsDevelopment = getTotalDevelopment(statisticsDocArr)
            let statisticsWorkspaces = getWorkspaces(statisticsDocArr)
            
    
            data = {
                languages: statisticsLenguage,
                workspaces: statisticsWorkspaces,
                totalDevelopment: statisticsDevelopment,
                lastTracking: statisticsDoc.lastTracking
            }
    
        }
        
        let response = data ? data : "you don't have statistics yet"
        return response
        
    } catch(error) {
        console.log(error)
        return error
    }
 
}

// PUT {userId}/statistics
async function updateStatistics (req, h) {
    const userId = req.params.userId
    const reqPayload = req.payload
    const userKey = req.headers.userkey

    try {
        const ObjectID = req.mongo.ObjectID
        let findUserByKey = await req.mongo.db[config.own].collection('users').find({ key: userKey }).project({ name: false, email: false, key: false })
        const userByKey = await findUserByKey.next()

        if ( ( userByKey == null ) || ( userByKey._id != userId ) ) { 
            throw Boom.badRequest("invalid credentials");
            
        }
        if(!reqPayload) {
            throw Boom.badRequest("add body data to update the information");
        }
        
        const statisticsDoc = await req.mongo.db[config.own].collection('statistics').findOne({ userId: new ObjectID(userId) }) 
        let statisticsDocArr = await Object.entries(statisticsDoc)
        
        let statisticsIndex = statisticsDocArr.findIndex((element) => element[0] == "languages")
        let lasTrackingIndex = statisticsDocArr.findIndex((element) => element[0] == "lastTracking")

        reqPayload.statistics.forEach(data => {

            let addedInStatics= false;
            statisticsDocArr[statisticsIndex][1].forEach((statistic, index) => { 
                if(data.lan == statistic.lan && data.workspace == statistic.workspace && data.fileName == statistic.fileName && data.os == statistic.os) {
                    
                    statisticsDocArr[statisticsIndex][1][index].stamps.push(data.stamps)


                    statisticsDocArr[statisticsIndex][1][index] = {
                        ...statisticsDocArr[statisticsIndex][1][index],
                        time: statisticsDocArr[statisticsIndex][1][index].time + data.time,
                    }

                    addedInStatics = true
                    return
                } 
            })

            if(!addedInStatics) {
                statisticsDocArr[statisticsIndex][1].push(
                    {
                        ...data,
                        stamps: [data.stamps]
                    }
                )
                addedInStatics = false

                return
            }
        })
        
        let dataIndex = reqPayload.statistics.length - 1
        statisticsDocArr[lasTrackingIndex][1] = reqPayload.statistics[dataIndex].stamps.end
           
     

        const updateStatistics = await req.mongo.db[config.own].collection('statistics').replaceOne( { userId: new ObjectID(userId) }, Object.fromEntries(statisticsDocArr))

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
        let findUserByKey = await req.mongo.db[config.own].collection('users').find({ key: userKey }).project({ name: false, email: false, key: false })
        const userByKey = await findUserByKey.next()

        if ( userByKey._id != userId ) { 
            throw Boom.badRequest("invalid credentials");
        }
        const createStatistics = await req.mongo.db[config.own].collection('statistics').replaceOne(
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