function countDecimals(number) {
    let strNumber = number.toString()
    let strDot = strNumber.indexOf('.')

    if ( strDot == -1 ) {
        return 0
    } else {
        return strNumber.slice(strDot + 1).length
    }

}

function removeDecimals(minutes, decimals, decimalsToRemove) {
    let decimalsToCut = decimals - decimalsToRemove
    let newMinutes = parseFloat(minutes.toString().slice(0, -decimalsToCut)) 
    return (newMinutes)
}

module.exports = function secondsToMinutes(seconds) {
    let minutes = seconds / 60
    const decimals = countDecimals(minutes)

    if(decimals <= 1) {
        return minutes
    } else {
        let newMinutes = removeDecimals(minutes, decimals, 1)
        return newMinutes
    }

}
