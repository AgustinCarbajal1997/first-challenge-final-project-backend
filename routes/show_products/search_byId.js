const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.use('/:id', (request, response)=>{
    const { id } = request.params;
    if(!id) return response.status(400).json({ error:"Bad request" })
    fs.readFile(path.join(__dirname,"../../db/db.json"),(error,data)=>{
        if(error){
            response.status(404).json({ error:"No se encontraron resultados" })
            return;
        }
        const findProduct = JSON.parse(data).find(item => item.id === parseInt(id));
        return findProduct 
            ? response.status(200).json(findProduct)
            : response.status(400).json({ error:"Product does not exist" })
    })
})

module.exports = router;


