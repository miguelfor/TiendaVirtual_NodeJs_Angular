'use strict'
var fs =require('fs');
var path= require('path');

var bcrypt = require('bcrypt-nodejs');
var Product = require('../models/product');
var jwt = require('../services/jwt.js');
var mongoosePaginate = require('mongoose-Pagination');


function pruebas (req, res){
	res.status(200).send({
		message:'probando accion controlador'
	});
}


function getProducts(req, res){
	if(!req.params.page){
	var page= 1;
	}else{
		var page= req.params.page;
	}
	
	var itemsPerPage=30;

	Product.find().sort('nombre').paginate(page,itemsPerPage, function(err,products, total){
		if(err){
				res.status(500).send({message: 'error peticion'});
		}else{
			if(!products){
					res.status(404).send({message: 'no hay productos'});
			}else{
					return res.status(200).send({
						total_elementos:total,
						products:products
					});
			}

		}
	});
	}


 function getDescriptionProducts(req, res){

 	var artistId=req.params.id;
	
 	 Product.findById(artistId, (err, product)=>{
 	 if(err){
 	 			//res.status(404).send({message: 'Reset'});
 	 			res.status(500).send({message: 'error en la peticcion'});
 	 }else{
 	 	if(!product){
				res.status(400).send({message: 'el producto no existe'});
 	 	}else{
 	 			res.status(200).send({product});
 	 	}
 	 }
});
 	}

 	 function updateProduct(req,res){
	var Id =req.params.id;
	var cantidad =req.params.cantidad;
	var update =req.body;
	let pro;

Product.findById(Id, (err, product)=>{
 	 if(err){
 	 			//res.status(404).send({message: 'Reset'});
 	 			res.status(500).send({message: 'error en la peticcion'});
 	 }else{
 	 	if(!product){
				res.status(400).send({message: 'el producto no existe'});
 	 	}else{
 	 		//res.status(200).send({message: 'sdfsdfsdfsd'+Id+'--'+cantidad+'--'});
 	 		pro=product;
 	 			//res.status(200).send({product});


 	 		update=pro;
 			update.stock=update.stock-cantidad;
	Product.findByIdAndUpdate(Id, update, (err, userUpdated) =>{
		if(err){
			res.status(500).send({message:'error al actualizar el usuario'});
		}else{
			if(!userUpdated){
				res.status(404).send({message:'no se ha podido actualizar el usuario'});
			}else{
				res.status(200).send({user: userUpdated});
			}
		}
	}); 
 	 	}
 	 }
});

//res.status(200).send({product});

	// Product.find({_id:ObjectId("59d50007f6487530a04c1dfc")});

	


}
 


	function inicialProducts(req,res){

	let newProduct = new Product();
			 
	var articulos = [
			{nombre: "Aguacate", img: "aguacate.jpg", precio: "5.00", stock: "46"},
			{nombre: "Ajo", img: "ajo.jpg", precio: "2.00", stock: "75"},
			{nombre: "Almendras", img: "almendras.jpg", precio: "6.00", stock: "28"},
			{nombre: "Arándanos", img: "arandanos.jpg", precio: "6.00", stock: "39"},
			{nombre: "Brócoli", img: "brocoli.png", precio: "3.00", stock: "45"},
			{nombre: "Calabaza", img: "calabaza.jpg", precio: "6.00", stock: "40"},
			{nombre: "Canela", img: "canela.jpg", precio: "2.00", stock: "20"},
			{nombre: "Cebolla", img: "cebolla.jpg", precio: "4.00", stock: "30"},
			{nombre: "Fresa", img: "fresa.jpg", precio: "2.00", stock: "50"},
			{nombre: "Kiwi", img: "kiwi.jpg", precio: "3.00", stock: "36"},
			{nombre: "Limón", img: "limon.jpg", precio: "1.50", stock: "70"},
			{nombre: "Lychee", img: "lychee.jpg", precio: "5.00", stock: "80"},
			{nombre: "Maiz", img: "maiz.jpg", precio: "2.50", stock: "40"},
			{nombre: "Manzana", img: "manzana.jpg", precio: "3.40", stock: "39"},
			{nombre: "Naranja", img: "naranja.jpg", precio: "3.00", stock: "60"},
			{nombre: "Papa", img: "papa.jpg", precio: "3.50", stock: "60"},
			{nombre: "Pasta", img: "pasta.jpg", precio: "2.50", stock: "47"},
			{nombre: "Pimienta", img: "pimienta.jpg", precio: "3.80", stock: "70"},
			{nombre: "Repollo", img: "repollo.jpg", precio: "4.50", stock: "67"},
			{nombre: "Tomate", img: "tomate.jpg", precio: "2.80", stock: "78"},
			{nombre: "Zanahoria", img: "zanahoria.jpg", precio: "1.80", stock: "58"}
		]

		Product.count({}, function( err, count){
		    //res.status(404).send({message: 'Number of users:', count });
		   if(count>21){
			Product.remove({}, function(error){
		      if(error){
		       res.status(404).send({message: 'no  err'});
		      }else{ 
		      	for (var i = 0; i < articulos.length ; i++) {
					var articulo = articulos[i];
					let newProduct = new Product(articulo);
					newProduct.save();
				}
		  
		         res.status(404).send({message: 'Reset'});
		      }
		   });

		   }else if(count==0){

			for (var i = 0; i < articulos.length ; i++) {
					var articulo = articulos[i];
					let newProduct = new Product(articulo);
					newProduct.save();
				}
				res.status(404).send({message: 'inicializada'});
		   } else{

		   	res.status(404).send({message: 'esta lista'});
		   }
		})
	}

module.exports = {
	pruebas,
	getProducts ,
	inicialProducts,
	getDescriptionProducts,
	updateProduct
};