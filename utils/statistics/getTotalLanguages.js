const secondsToMinutes = require('../secondsToMinutes')
const getColor = require('../getColor')
const setLanguageName = require('../setLanguageName')

module.exports = function getTotalLanguages(arrayDocData) {
    languagesIndex = arrayDocData.findIndex(element => element[0] == 'languages')

    let newData = []
    

    arrayDocData[languagesIndex][1].forEach(statistics => {
        let  newDataIndex = newData.findIndex(element => {
            // set new Language name for the current stadistic
            let currentLanguageName = setLanguageName(statistics.lan)
            return element.lan == currentLanguageName
        
        })

        if(newDataIndex == -1) {
            newData.push({
                // set new Language name
                lan: setLanguageName(statistics.lan),
                color: getColor(statistics.lan),
                // pass minutes to seconds
                time: secondsToMinutes(statistics.time)
            })
        } else {
            newData[newDataIndex] = {
                ...newData[newDataIndex],
                // pass minutes to seconds
                time: newData[newDataIndex].time +  secondsToMinutes(statistics.time)
            }
        }
    })

    return newData
}