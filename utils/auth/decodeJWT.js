const Jwt = require('@hapi/jwt');

module.exports = function decodeJWT(authorizationHeader) {

    let jwtParsed = authorizationHeader.replace('Bearer ', '')

    let jwtPayload = Jwt.token.decode(jwtParsed).raw.payload
    let jwtPayloadDecoded = JSON.parse(Buffer.from(jwtPayload, 'base64').toString('utf-8'))

    return jwtPayloadDecoded
}