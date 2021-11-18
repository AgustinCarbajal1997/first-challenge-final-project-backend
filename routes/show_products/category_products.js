const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.use("/:category", (request, response) => {
  const { category } = request.params;
  if(!category) return response.status(400).json({ error:"Bad request" })
  fs.readFile(path.join(__dirname, "../../db/db.json"),(error,data)=>{
    if(error){
      response.status(404).json({ error:"No se encontraron resultados" })
      return;
    }
    const filterProducts = JSON.parse(data).filter(item => item.article === category);
    return response.status(200).json(filterProducts);
  })

  
});

module.exports = router;
