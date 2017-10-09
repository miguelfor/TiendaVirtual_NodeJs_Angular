'use strict'
var fs =require('fs');
var path= require('path');

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt.js');
var mongoosePaginate = require('mongoose-Pagination');


function pruebas (req, res){
	res.status(200).send({
		message:'probando accion controlador'
	});
}


function saveUser(req, res){
	var user = new User();

	var params = req.body;

	console.log(params);
	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.role = 'ROLE_ADMIN';
	user.image = 'null';

	if (params.password){
		//encriptar pass
		bcrypt.hash(params.password,null, null, function(err,hash){
			user.password=hash;

			if(user.name !=null && user.surname !=null && user.email != null){
				//save
				user.save((err, userStored)=> {
					if(err){
						res.status(500).send({message:'error al guardar user'});
					}else{
						if(!userStored){
							res.status(404).send({message:'no se ha registrado el user'});
						}else{
							res.status(200).send({user: userStored});
						}
						
					}
				});
			}else{
				res.status(200).send({message:'Rellena todos los datos'});
			}
		});
	}else{
		res.status(500).send({message: 'introduce la pass'});
	}


}

function loginUser(req, res){
	var params= req.body;
	var email = params.email;
	var password = params.password;

	User.findOne({email: email.toLowerCase()},(err, user)=>{
		if(err){
			res.status(500).send({message: 'error en la peticion'});
		}else{
			if(!user){
				res.status(404).send({message:'El usuario no existe'});
			}else{
				bcrypt.compare(password,user.password, function(err, check){
					if(check){
						//devolver usuario logueado
						if(params.gethash){
							//devolver los datos del usuario logueado en un token jwt
							res.status(200).send({
								token: jwt.createToken(user)	
							});	
						}else{
							res.status(200).send({user});
						}
					}else{
						res.status(404).send({message:'el usuario no a podido loguearse'});
					}
				});				
			}
		}
	});
}

function updateUser(req,res){
	var userId =req.params.id;
	var update =req.body;

	User.findByIdAndUpdate(userId, update, (err, userUpdated) =>{
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


function uploadImage(req,res){
		var userId= req.params.id;
		var file_name='No subido...';

		if(req.files){
			var file_path = req.files.image.path;
			var file_split = file_path.split('\\');
			var file_name = file_split[2];

			var ext_split= file_name.split('\.');
			var file_ext= ext_split[1];

			if(file_ext== 'png' || file_ext=='jpg' || file_ext=='gif'){
					
					User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
					if(!userUpdated){
					res.status(404).send({message:'no se ha podido actualizar el usuario'});
					}else{
					res.status(200).send({user: userUpdated});
					}
					});	
			
			}else{
				res.status(200).send({message: 'Extension del archivo no valida'});
			}
		//	console.log(file_path);
		}else{
				res.status(200).send({message: 'no has subido ninguna imagen...'});
		}
}

function getImageFile(req, res){
	var imageFile= req.params.imageFile;
	var path_file=	'./uploads/users/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'no existe imagen...'});
		}
	});
}

function getUsers(req, res){
	if(!req.params.page){
	var page= 1;
	}else{
		var page= req.params.page;
	}
	
	var itemsPerPage=2;

	User.find().sort('name').paginate(page,itemsPerPage, function(err,users, total){
		if(err){
				res.status(500).send({message: 'erro peticion'});
		}else{
			if(!users){
					res.status(404).send({message: 'no hat usersn'});
			}else{
					return res.status(200).send({
						pages:total,
						users:users
					});
			}

		}
	});
	}
 

 function inicialUsers(req,res){

	//let newProduct = new Product();
			 
	var articulos = [
		{  "password" : "$2a$10$0MNa1DyO2SmPmPrWhuy2C.LOiwQwgIPussrfpCadffF56Q2Nj9FyG", "role" : "ROLE_ADMIN", "email" : "juan@juan.com", "surname" : "Lopez", "name" : "juan", "__v" : 0 },
		{  "password" : "$2a$10$PFByiX00cMBuumuoRs.O8.LWYXgSyr2Fsjg3BQlIhaOolenEFAkV2", "role" : "ROLE_ADMIN", "email" : "juan1@juan.com", "surname" : "Lopez", "name" : "juan", "__v" : 0 },
		{  "password" : "$2a$10$qQdrHHKERgr2uNon6lYq0.WpYx.zbJ90iC88ZMeIGIWvRFRexku92", "role" : "ROLE_USER", "email" : "juan2@juan.com", "surname" : "Lopez", "name" : "juan", "__v" : 0 },
		{  "password" : "$2a$10$YwautqOSByZ6WNQV.I0mc.C4mUJra/aQA.GOVFETWHAjzjzCNL0dS", "role" : "ROLE_ADMIN", "email" : "admin@admin.com", "surname" : "WEB", "name" : "Miguel", "__v" : 0, "image" : "y6udWqIwDL0oe7YjW2sLj35D.jpg" }
		]

		User.count({}, function( err, count){
		    //res.status(404).send({message: 'Number of users:', count });
		   if(count>4){
			User.remove({}, function(error){
		      if(error){
		       res.status(404).send({message: 'no  err'});
		      }else{ 
		      	for (var i = 0; i < articulos.length ; i++) {
					var articulo = articulos[i];
					let newUser = new User(articulo);
					newUser.save();
				}
		  
		         res.status(404).send({message: 'Reset'});
		      }
		   });

		   }else if(count==0){

			for (var i = 0; i < articulos.length ; i++) {
					var articulo = articulos[i];
					let newUser = new User(articulo);
					newUser.save();
				}
				res.status(404).send({message: 'inicializada'});
		   } else{

		   	res.status(404).send({message: 'esta lista'});
		   }
		})
	}


module.exports = {
	pruebas,
	saveUser,
	loginUser,
	updateUser,
	uploadImage,
	getImageFile,
	getUsers,
	inicialUsers
};