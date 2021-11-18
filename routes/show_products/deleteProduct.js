const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.delete("/:id/:user", (request, response) => {
    const user = request.params.user;
    if(!user || user !== "admin") return response.status(407).json({error:"Falta autenticación"})
    fs.readFile(path.join(__dirname, "../../db/db.json"),(error, data) => {
        if(error){
            console.log(error);
            return;
        }
        let products = JSON.parse(data);
        let filterData = products.filter(item => item.id !== parseInt(request.params.id));
        fs.writeFile(path.join(__dirname, "../../db/db.json"),JSON.stringify(filterData),(error)=>{
            if(error){
                console.log(error)
                return response.json({ error:"Ha ocurrido un error" })
            }
            response.status(201).json({ operacion:"Eliminado con exito" })
        })
    })
})
                
    

module.exports = router;