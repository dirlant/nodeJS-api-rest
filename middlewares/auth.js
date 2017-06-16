'use strict'

const services = require('./../services/index')

function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(404).send({mensaje: 'No tienes autorizacion'})
    }

    const token = req.headers.authorization.split(' ')[0]
    //return res.send({token: token})
    
    const decode = services.decodeToken(token)

    if(decode){
        req.user = decode
        next()
    }
    //return res.status(200).send({mensaje: decode.sub})
    /*
    services.decodeToken(token)
        .then(response => {
            req.user = response,
            next()
        })
        .catch(response => {
            rest.status(response.status)
        })
    */
}

module.exports = {
    isAuth
}