'use strict'

const mongoose = require('mongoose')
const User = require('./../models/user')
const service = require('./../services/index')

function singUp(req, res){
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName
    })

    user.save((err, success) =>{
        if(err) res.status(500).send({mensaje: `Error al crear el usuario ${err}`})

        res.status(500).send.({ tocken: service.createToken(user)})
    })

}

function singIn(req, res){

}

module.exports = {
    singUp,
    singIn
}