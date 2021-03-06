'use strict'

const express = require('express');
const api = express.Router();
const productController = require('./../controllers/product')
const userController = require('./../controllers/user')
const auth = require('./../middlewares/auth')

api.get('/products', productController.getProducts)
api.get('/product/:productId', productController.getProduct)
api.post('/product', productController.saveProduct)
api.put('/product/:productId', productController.updateProduct)
api.delete('/product/:productId',productController.deleteProduct)

api.get('/users', userController.getUsers)

api.post('/singin', userController.singIn)
api.post('/singup', userController.singUp)
api.get('/private', auth.isAuth)


const tokenController = require('./../controllers/token')
api.get('/private2', tokenController.getToken)

module.exports = api 