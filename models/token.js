'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema = Schema({
    userID:{
        type: String
    },
    token: {
         type: String, 
    },
    date: {
        type: Date,
        default: Date.now() 
    }
})

module.exports = mongoose.model('Token', TokenSchema)