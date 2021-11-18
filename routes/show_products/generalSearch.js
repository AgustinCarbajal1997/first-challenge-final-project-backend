const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.use("/", (request, response) => {
  let { q, limit } = request.query;
  if (!q || !q.length || !q[0].length) {
    return response
      .status(400)
      .json({ error: "No ha introducido parametros de búsqueda" });
  }
  // console.log(Number(limit))
  // limit = limit ?? 0;
  const regexList = q.map((item) => new RegExp(`${item}`, "i"));
  Product.find({ title: { $all: regexList } }).limit(Number(limit) || 0)
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      console.log("Ocurrio un erro", error);
    });
});

module.exports = router;
