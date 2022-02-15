const secondsToMinutes = require('../secondsToMinutes')
const getColor = require('../getColor')
const setLanguageName = require('../setLanguageName')

module.exports = function getWorkspaces(arrayDocData) {
    languagesIndex = arrayDocData.findIndex(element => element[0] == 'languages')

    let newData = []
    
    arrayDocData[languagesIndex][1].forEach(statistics => {

        if(!statistics.workspace) {
            return
        }
        let  newDataIndex = newData.findIndex(element => element.workspace === statistics.workspace)

        if(newDataIndex == -1) {
            newData.push({
                workspace: statistics.workspace,
                languages: [{
                    // set new Language name
                    lan: setLanguageName(statistics.lan),
                    color: getColor(statistics.lan),
                    // pass minutes to seconds
                    time: secondsToMinutes(statistics.time)
                }],
                // pass minutes to seconds
                totalDevelopment: secondsToMinutes(statistics.time)
            })
            
        } else {
            // set new Language name for the current stadistic
            let newLanguageIndex =  newData[newDataIndex].languages.findIndex(element => {
                let currentLanguageName = setLanguageName(statistics.lan)
                return element.lan == currentLanguageName
            })
            
            if(newLanguageIndex == -1) {
                newData[newDataIndex].languages.push({
                    // set new Language name
                    lan: setLanguageName(statistics.lan),
                    color: getColor(statistics.lan),
                    // pass minutes to seconds
                    time: secondsToMinutes(statistics.time)
                })

            } else {
                newData[newDataIndex].languages[newLanguageIndex] = {
                    ...newData[newDataIndex].languages[newLanguageIndex],
                    // pass minutes to seconds
                    time: newData[newDataIndex].languages[newLanguageIndex].time + secondsToMinutes(statistics.time)
                }
            }

            newData[newDataIndex] = {
                ...newData[newDataIndex],
                // pass minutes to seconds
                totalDevelopment: newData[newDataIndex].totalDevelopment +  secondsToMinutes(statistics.time)
            }
        }
        
    })

    return newData
}