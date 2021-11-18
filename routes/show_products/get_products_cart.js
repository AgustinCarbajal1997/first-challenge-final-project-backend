const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/:id/productos", (request, response) => {
  fs.readFile(path.join(__dirname, "../../db/carts.json"), (error, data)=>{
      if(error){
          console.log(error);
          return;
      }
      const findCart = JSON.parse(data).find(item => item.id === request.params.id);
      return findCart 
        ? response.status(200).json({ products:findCart.products })
        : response.status(204).json({ products:"Id does not exist" })
  })
});
module.exports = router;
