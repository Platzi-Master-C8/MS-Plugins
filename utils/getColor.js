const { randomColorHEX } = require('./randomColor')

function hasInDb(language) {

    switch (language) {
        case 'html':
        case 'HTML':
        case 'jade':
            return '#DD4B25'
            break
        case 'css':
        case 'CSS':
            return '#0068BA'
            break
        case 'js':
        case 'JS':
        case 'javascript':
            return '#F7D70A'
            break
        default:
            return randomColorHEX()
            break
    }
}

module.exports = function getColor(language) {
    return hasInDb(language)

}