const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const template = require("../models/template");

router.put("/:id/:user", (request, response) => {
    const user = request.params.user;
    if(!user || user !== "admin") return response.status(407).json({error:"Falta autenticación"})
    fs.readFile(path.join(__dirname, "../../db/db.json"),(error, data) => {
        if(error){
            console.log(error);
            return;
        }
        let products = JSON.parse(data);
        let findProduct = products.find(item => item.id === parseInt(request.params.id));
        if(!findProduct) return response.json({ error: "No se encontró el producto" });
        const indexToReplace = products.findIndex(item => item.id === parseInt(request.params.id));
        const updatedProduct = {
            id:parseInt(request.params.id),
            article: request.body.article || findProduct.article,
            title: request.body.title || findProduct.title,
            images: [request.body.images],
            price: request.body.price || findProduct.price,
            unites: request.body.unites || findProduct.unites,
            description: template.description,
            specifications: template.specifications
        }
        products[indexToReplace] = updatedProduct;
        fs.writeFile(path.join(__dirname, "../../db/db.json"),JSON.stringify(products),(error)=>{
            if(error){
                console.log(error)
                return response.json({ error:"Ha ocurrido un error" })
            }
            response.status(201).json({ operacion:"Actualizado con exito" })
        })
    })
})
                
    

module.exports = router;