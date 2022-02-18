module.exports = function parseProvider(providerSub) {
    let lowerCaseProv = providerSub.toLowerCase()

    if(lowerCaseProv.includes('linkedin')) {
        return 'linkedin'
    }

    if(lowerCaseProv.includes('twitter')) {
        return 'twitter'
    }

    if(lowerCaseProv.includes('facebook')) {
        return 'facebook'
    }
}