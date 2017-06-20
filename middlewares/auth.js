'use strict'

const services = require('./../services/index')
const Token = require('./../controllers/token')
//const Token = require('./../models/token')

function isAuth(req, res){
    //sconsole.log(req.headers.authorization)
    if(!req.headers.authorization){
        return res.status(404).send({mensaje: 'No tienes autorizacion'})
    }

    Token.getToken(req.headers._id)
    .then(tokenResuelto => {
        console.log(tokenResuelto)
        return Token.compararToken(req.headers.authorization, tokenResuelto)
    })
    .then(done => {
        res.status(200).send({mensaje: done});
    })
    .catch(err => {
        res.status(404).send({mensaje: 'No tienes Acceso'})
    })

/*
    console.log(req.headers._id)
    let userID = req.headers._id

    Token.find({"userID": userID}, (err, success) => {
        if (err){
            return res.status(404).send({mensaje: 'No tienes autorizacion'})            
        } 
        if (!success){
            res.status(404).send({mensaje : `No se ha encontrado el usuario ${success}`})            
        } 
        
        res.status(200).send({mensaje : success})  
        
        if(success.token == req.headers.authorization){
            req.user = success.token
            next()
        }      
    })

*/
   
    
    //const decode = services.decodeToken(token)

    /*
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