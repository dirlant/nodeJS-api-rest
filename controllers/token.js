'user strict'

const Token = require('./../models/token')

function getToken(req){

    return new Promise((resolve, reject) => {
        Token.find({"userID": req}, (err, done) => {
            if (err){
                return reject(err)           
            } 
            if (!done){
                return reject(err)
            } 

            resolve(done[0].token)                  
        })
    })

}

function compararToken(tokenEnviado, tokenEncontrado){
    
    return new Promise((resolve, reject) => {            
        if(tokenEnviado != tokenEncontrado){
            reject('No tienes acceso')    
        }

        if(tokenEnviado == tokenEncontrado){
            resolve('Tienes Acceso')
        }
    })

     /*
    return new Promise((resolve, reject) =>{
        if (err){
            return reject(err)           
        } 
        resolve('Segunda promesa')         
    })
    */

}

module.exports = {
    getToken,
    compararToken
}