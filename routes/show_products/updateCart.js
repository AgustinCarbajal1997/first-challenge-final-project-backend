const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.put("/:id", (request, response) => {
  const { products } = request.body;
  
  const newUpdateCart = {
    id: request.params.id,
    timestamp: new Date().getTime(),
    products,
  };
  fs.readFile(path.join(__dirname, "../../db/carts.json"), (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    let carts = JSON.parse(data)
    const findId = carts.findIndex(item => item.id === request.params.id);
    carts[findId] = newUpdateCart;
    
    fs.writeFile(
      path.join(__dirname, "../../db/carts.json"),
      JSON.stringify(carts),
      (error) => {
          if(error){
              console.log(error);
              return;
          }
          response.status(201).json({ update: "Updated successfully" })
      });
  });
});

module.exports = router;