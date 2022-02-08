module.exports = function getTotalDevelopment(arrayDocData) {
    languagesIndex = arrayDocData.findIndex(element => element[0] == 'languages')

    let totalDevelopment = 0;

    arrayDocData[languagesIndex][1].forEach((element) => {
        totalDevelopment += element.time
    })
    
    

    return totalDevelopment
}