const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.delete("/:id", (request, response) => {
  fs.readFile(path.join(__dirname, "../../db/carts.json"), (error, data)=>{
      if(error){
          console.log(error);
          return;
      }
      const filterCarts = JSON.parse(data).filter(item => item.id !== request.params.id);
      fs.writeFile(path.join(__dirname, "../../db/carts.json"), JSON.stringify(filterCarts), (error)=>{
          if(error){
              console.log(error);
              return;
          }
          response.status(200).json(filterCarts)
      })
  })
  
  
});

module.exports = router;