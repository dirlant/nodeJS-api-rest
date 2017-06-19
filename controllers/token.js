'user strict'

const Token = require('./../models/token')

function getToken(req, res){

    console.log(req.headers._id)
    let userID = req.headers._id

    Token.findById(userID, (err, respuesta) => {
        if (err) return res.status(500).send({mensaje : `error  con el servidor ${err}`})
        if (!respuesta) return res.status(404).send({mensaje : `No se ha encontrado el usuario ${respuesta}`})

        res.status(200).send({token: respuesta })        
    })
}
module.exports = {
    getToken
}