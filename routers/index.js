'use strict'

const express = require('express');
const api = express.Router();
const productController = require('./../controllers/product')
const auth = require('./../middlewares/auth')

api.get('/products', productController.getProducts)
api.get('/product/:productId', productController.getProduct)
api.post('/product', productController.saveProduct)
api.put('/product/:productId', productController.updateProduct)
api.delete('/product/:productId',productController.deleteProduct)
api.get('/private', auth.isAuth, (req, res) => {
    res.status(200).send({mensaje: 'Tienes acceso'})

})

module.exports = api 