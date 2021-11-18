const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.use("/", (request, response)=>{
    fs.readFile(path.join(__dirname,"../../db/db.json"),(error,data)=>{
        if(error){
            response.status(404).json({ error:"No se encontraron resultados" })
            return;
        }
        response.status(200).json(JSON.parse(data))
    })
})

module.exports = router;