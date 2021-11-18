// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('./routes/mongo_connection');

var indexRouter = require('./routes/index');
const allProducts = require('./routes/show_products/all_products');
const addProducts = require('./routes/show_products/add_products');
const updateProducts = require('./routes/show_products/updateProduct');
const deleteProduct = require('./routes/show_products/deleteProduct');
const categoryProductsRouter = require('./routes/show_products/category_products');
const searchByIdRouter = require('./routes/show_products/search_byId');
const getCarts = require('./routes/show_products/getCarts');
const createCart = require('./routes/show_products/create_cart');
const deleteCart = require('./routes/show_products/delete_cart');
const getProductsCart = require('./routes/show_products/get_products_cart');
const updateCart = require('./routes/show_products/updateCart');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// products
app.use('/api/productos/all',allProducts);
app.use('/api/productos/category', categoryProductsRouter);
app.use('/api/productos/getById', searchByIdRouter);
app.use('/api/productos', addProducts);
app.use('/api/productos', updateProducts);
app.use('/api/productos', deleteProduct);
// cart
app.use('/api/carrito', getProductsCart);
app.use('/api/carrito', getCarts);
app.use('/api/carrito', createCart);
app.use('/api/carrito', deleteCart);
app.use('/api/carrito', updateCart);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(404).json({ error:`Error 404 pagina ${req.originalUrl} no encontrada` })
});
  

module.exports = app;
