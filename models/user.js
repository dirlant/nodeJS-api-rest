'use strict'
 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

 const UserSchema = Schema({
    email: {
         type: String, 
         unique: true, 
         lowercase: true
    },
    displayName: String,
    avatar: String,
    password: {
         type: String, 
         select: false
    },
    singUpDate: {
        type: Date,
        default: Date.now()
    },
    lastLogin: Date
 })

 module.exports = mongoose.model('User', UserSchema)