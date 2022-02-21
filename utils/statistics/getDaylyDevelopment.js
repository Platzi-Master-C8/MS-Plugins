const secondsToMinutes = require('../secondsToMinutes')

module.exports = function getDaylyDevelopment(arrayDocData) {
    languagesIndex = arrayDocData.findIndex(element => element[0] == 'languages')

    const currentDate = new Date()
    const currentDateParsed = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`
    let totalDaylyDevelopment = 0
    arrayDocData[languagesIndex][1].forEach(statistic => {
        statistic.stamps.forEach(stamps => {
            let stampDate = new Date(Date.parse(stamps.start))
            let parseDate = `${stampDate.getDate()}/${stampDate.getMonth()}/${stampDate.getFullYear()}`

            if( currentDateParsed == parseDate ){
                let totalTimeStamp = Date.parse(stamps.end) - Date.parse(stamps.start) 
                totalDaylyDevelopment = totalDaylyDevelopment + totalTimeStamp
            }

        })
    });

    totalDaylyDevelopment = totalDaylyDevelopment / 1000
    totalDaylyDevelopment = secondsToMinutes(totalDaylyDevelopment)

    return totalDaylyDevelopment

}



