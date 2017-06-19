'user strict'

const Token = require('./../models/token')

function getToken(req, res){

    return new Promise((resolve, reject) =>{
        Token.find({"userID": req}, (err, done) => {
            if (err){
                return reject(err)           
            } 
            if (!done){
                return reject(err)
            } 

            resolve(done)                  
        })
    })

}

module.exports = {
    getToken
}