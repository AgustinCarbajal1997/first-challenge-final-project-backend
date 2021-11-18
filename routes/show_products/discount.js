const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.use('/:categoryDiscount', (request, response)=>{
    const { categoryDiscount } = request.params;

    Product.find({ [categoryDiscount] : { $gt : 0 } })
        .then((result)=>{
            console.log("Busqueda realizada con exito");
            response.json(result);
        })
        .catch((error)=>{
            console.log(error)
        })
})


module.exports = router;