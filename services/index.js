'user strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('./../config')

function createToken(user){
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment(14, 'days').unix(),

    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token){
    
    console.log(token)

    const payload = jwt.decode(token, config.SECRET_TOKEN)

    /*
    if(payload.exp <= moment().unix()){
        return 'El token ha expirado => decodeToken()'              
    }
    */

    

    return payload

    /*
    const decoded = new Promise((resolve, reject) => {
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN)

            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    mensaje: 'El token ha expirado => decodeToken()'
                })
            }
        }catch(err){
            reject({
                status: 500,
                mensaje: 'Token invalido => decodeToken()'
            })
        }
    })
    */

    
}

module.exports = {
    createToken,
    decodeToken
}