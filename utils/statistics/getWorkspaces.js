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
                    lan: statistics.lan,
                    time: statistics.time
                }],
                totalDevelopment: statistics.time
            })
            
        } else {
            let newLanguageIndex =  newData[newDataIndex].languages.findIndex(element => element.lan === statistics.lan)
            
            if(newLanguageIndex == -1) {
                newData[newDataIndex].languages.push({
                    lan: statistics.lan,
                    time: statistics.time
                })

            } else {
                newData[newDataIndex].languages[newLanguageIndex] = {
                    lan: statistics.lan,
                    time: newData[newDataIndex].languages[newLanguageIndex].time + statistics.time 
                }
            }

            newData[newDataIndex] = {
                ...newData[newDataIndex],
                totalDevelopment: newData[newDataIndex].totalDevelopment + statistics.time
            }
        }
        
    })

    return newData
}