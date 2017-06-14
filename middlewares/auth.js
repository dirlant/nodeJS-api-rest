'use strict'

const services = require('./../services/index')

function isAuth(err, res, next){
    if(!req.headers.authorization){
        return res.status(404).send({mensaje: 'No tienes autorizacion'})
    }

    services.decodeToken(token)
        .then(response => {
            req.user = response,
            next()
        })
        .catch(response => {
            rest.status(response.status)
        })
}

module.exports = {
    isAuth
}