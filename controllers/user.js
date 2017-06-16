'use strict'

const mongoose = require('mongoose')
const User = require('./../models/user')
const Token = require('./../models/token')
const service = require('./../services/index')

function singUp(req, res){
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password 
    })

    user.save((err, success) =>{        
        if(err) res.status(500).send({mensaje: `Error al crear el usuario ${err}`})

        //res.status(500).send({ token: service.createToken(user)})

        user.save((err, success) =>{        
            if(err) res.status(500).send({mensaje: `Error al crear el usuario ${err}`})
            
            let createToken = service.createToken(user)                        

            let token = new Token();
            token.userID = success._id
            token.token = createToken

            token.save((err, success)=>{
                if(err) res.status(500).send({mensaje: `Ha ocurrido un error ${err}`})
                //res.status(500).send({ token: createToken })
                res.status(200).send({token: success.token}) 
            })
            
            
        })
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