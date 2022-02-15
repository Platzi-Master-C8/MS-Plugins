module.exports = function setLanguageName(currentLanguage) {

    switch (currentLanguage) {
        case 'py':
        case 'PY':
            return 'python'
        case 'jade':
        case 'html':
            return 'html'
            break
        default:
            return currentLanguage
            break
    }

}