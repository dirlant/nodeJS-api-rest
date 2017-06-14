'user strict'

const Product = require('./../models/product')

function getProducts(req, res){
    Product.find({}, (err, respuesta) => {
        if (err) return res.status(500).send({mensaje : `error  con el servidor ${err}`})
        if (!respuesta) return res.status(404).send({mensaje : `No se ha encontrado el producto ${respuesta}`})

        res.status(200).send({producto: respuesta })
    })
}

function getProduct(req, res){
    let productId = req.params.productId;

    Product.findById(productId, (err, respuesta) => {
        if (err) return res.status(500).send({mensaje : `error  con el servidor ${err}`})
        if (!respuesta) return res.status(404).send({mensaje : `No se ha encontrado el producto ${respuesta}`})

        res.status(200).send({producto: respuesta })
        
    })
}

function saveProduct(req, res){
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
}

function updateProduct(req, res){
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
}

function deleteProduct(req, res){
    let productId = req.params.productId;

    Product.findByIdAndRemove(productId, (err, respuesta) => {
        if (err) return res.status(500).send({mensaje : `error  con el servidor ${err}`})
        if (!respuesta) return res.status(500).send({mensaje : `No se encontro ningun producto con ese ID ${err}`})
        
        respuesta.remove(err =>{
            if (err) return res.status(500).send({mensaje : `No se pudo borar el producto ${err}`})
            res.status(200).send({mensaje: `El producto fue borrado` })
        })              
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}