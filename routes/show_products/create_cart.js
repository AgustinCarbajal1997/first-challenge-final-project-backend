const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", (request, response) => {
  const { products } = request.body;
  const generateId = () => {
    const head = Date.now().toString(36);
    const tail = Math.random().toString(36).substr(2);
    return head + tail;
  };
  const newCart = {
    id: generateId(),
    timestamp: new Date().getTime(),
    products,
  };
  fs.readFile(path.join(__dirname, "../../db/carts.json"), (error, data) => {
    if (error) {
      console.log(error);
      return;
    }
    let carts = JSON.parse(data);
    carts = [...carts, newCart];
    fs.writeFile(
      path.join(__dirname, "../../db/carts.json"),
      JSON.stringify(carts),
      (error) => {
          if(error){
              console.log(error);
              return;
          }
          response.status(201).json({ id: newCart.id })
      });
  });
});

module.exports = router;
