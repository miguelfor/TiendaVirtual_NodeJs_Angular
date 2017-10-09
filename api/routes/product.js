'use strict'

var express = require('express');
var ProductController= require('../controller/product');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/users'});

api.get('/probando-controlador2', md_auth.ensureAuth, ProductController.pruebas);
api.get('/products/:page?', md_auth.ensureAuth, ProductController.getProducts); 
api.get('/description-products/:id', md_auth.ensureAuth, ProductController.getDescriptionProducts); 
api.post('/update-products/:id/:cantidad', ProductController.updateProduct); 
api.get('/inicialProducts', ProductController.inicialProducts);
/*api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);
*/
module.exports=api;