const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const template = require("../models/template");

router.post("/", (request, response) => {
    fs.readFile(path.join(__dirname, "../../db/db.json"),(error, data) => {
        if(error){
            console.log(error);
            return;
        }
        let products = JSON.parse(data);
        const maxId = Math.max(...products.map(item =>item.id))+1;
        const newProduct = {
            id:maxId,
            article: request.body.article,
            title: request.body.title,
            images: [request.body.images],
            price: request.body.price,
            unites: request.body.unites,
            description: template.description,
            specifications: template.specifications
        }
        products = [...products, newProduct];
        fs.writeFile(path.join(__dirname, "../../db/db.json"),JSON.stringify(products),(error)=>{
            if(error){
                console.log(error)
                return response.json({ error:"Ha ocurrido un error" })
            }
            response.status(201).json({ operacion:"Agregado con exito" })
        })
    })
})
                
    

module.exports = router;