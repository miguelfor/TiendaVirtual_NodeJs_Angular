'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
	nombre: String, 
	img: String,  
	precio: String,  
	stock: String,
});

module.exports = mongoose.model('Product', ProductSchema);

 