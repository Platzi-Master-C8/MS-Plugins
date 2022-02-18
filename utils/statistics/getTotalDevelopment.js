const secondsToMinutes = require('../secondsToMinutes')
const getColor = require('../getColor')

module.exports = function getTotalDevelopment(arrayDocData) {
    languagesIndex = arrayDocData.findIndex(element => element[0] == 'languages')

    let totalDevelopment = 0;


    arrayDocData[languagesIndex][1].forEach((element) => {
        totalDevelopment += element.time
    })
    
    //pass minutes to seconds
    totalDevelopment = secondsToMinutes(totalDevelopment)

    return totalDevelopment
}