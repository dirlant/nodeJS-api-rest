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
    user.find({}, (err, respuesta) => {
        if(err) res.status(500).send({mensaje: `Error del servidor => singIn() = ${err}`})
        if(!respuesta) res.status(500).send({mensaje: `El usuario no existe => singIn() = ${err}`})

        req.user = user;
        res.status(200).send({
            mensaje: 'Te has logueado correctamente => singIn()',
            token: service.createToken(user)
        })
    })
}

module.exports = {
    singUp,
    singIn
}