'use strict'

const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');

const Product = require('./models/product')
const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/api/product', (req, res) =>{
    Product.find({}, (err, respuesta) => {
        if (err) return res.status(500).send({mensaje : `error  con el servidor ${err}`})
        if (!respuesta) return res.status(404).send({mensaje : `No se ha encontrado el producto ${respuesta}`})

        res.status(200).send({producto: respuesta })
    })
})

app.get('/api/product/:productId', (req, res) =>{

    let productId = req.params.productId;

    Product.findById(productId, (err, respuesta) => {
        if (err) return res.status(500).send({mensaje : `error  con el servidor ${err}`})
        if (!respuesta) return res.status(404).send({mensaje : `No se ha encontrado el producto ${respuesta}`})

        res.status(200).send({producto: respuesta })
        
    })
    
})

app.post('/api/product', (req, res) =>{
    
    let product = new Product();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    product.save((err, success)=>{
        if(err) res.status(500).send({mensaje: `Ha ocurrido un error ${err}`})
        res.status(200).send({producto: success})
    })
    
    /*
    console.log(req.body);
    res.status(200).send({message: 'El producto se ha recibido'})
    */
})

app.put('/api/product/:productId', (req, res) =>{
    let productId = req.params.productId;
    let update = req.body;

    Product.findByIdAndUpdate(productId, update, (err, respuesta) => {
        if (err) return res.status(500).send({mensaje : `error  con el servidor ${err}`})
        if (!respuesta) {
            return res.status(404).send({mensaje : `No se ha encontrado el producto ${respuesta}`})
        }else{
             Product.findById(productId, (err, respuesta) => {
                if (err) return res.status(500).send({mensaje : `error  con el servidor ${err}`})
                if (!respuesta) return res.status(404).send({mensaje : `No se ha encontrado el producto ${respuesta}`})

                res.status(200).send({producto: respuesta })                
            })
        }        
    })

})

app.delete('/api/product/:productId', (req, res) =>{
    let productId = req.params.productId;

    Product.findByIdAndRemove(productId, (err, respuesta) => {
        if (err) return res.status(500).send({mensaje : `error  con el servidor ${err}`})
        if (!respuesta) return res.status(500).send({mensaje : `No se encontro ningun producto con ese ID ${err}`})
        
        respuesta.remove(err =>{
            if (err) return res.status(500).send({mensaje : `No se pudo borar el producto ${err}`})
            res.status(200).send({mensaje: `El producto fue borrado` })
        })

        
        
    })
})

/*
app.get('/hola', (req, res) =>{
    res.send({message: 'hola mundo'})
})
*/

app.get('/hola/:name', (req, res) =>{
    res.send({message: `hola como estas? ${req.params.name}`})
})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
    if(err) throw err;
    console.log('Conexion establecida')
    
    app.listen(port, () =>{
        console.log(`API REST corriendo en el puerto http://localhost:${port}`)
    })
})
