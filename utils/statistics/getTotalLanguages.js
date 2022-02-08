module.exports = function getTotalLanguages(arrayDocData) {
    languagesIndex = arrayDocData.findIndex(element => element[0] == 'languages')

    let newData = []
    
    arrayDocData[languagesIndex][1].forEach(statistics => {
        let  newDataIndex = newData.findIndex(element => element.lan == statistics.lan)

        if(newDataIndex == -1) {
            newData.push({
                lan: statistics.lan,
                time: statistics.time
            })
        } else {
            newData[newDataIndex] = {
                ...newData[newDataIndex],
                time: newData[newDataIndex].time +  statistics.time
            }
        }
    })

    return newData
}