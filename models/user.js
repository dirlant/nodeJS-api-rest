'use strict'
 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

 const UserSchema = Schema({
     name: String,
     picture: String,
     price: {type: Number, default: 0},
     category: {type: String, enum: ['computers', 'phones', 'accesorios']},
     description: String
 })

 module.exports = mongoose.model('Product', ProductSchema)