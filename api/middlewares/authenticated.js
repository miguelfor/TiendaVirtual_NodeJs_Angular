'use strict'

var jwt = require ('jwt-simple');
//dentro payload fecha creacion y fecha de expiracion
var moment = require('moment');
var secret='clave_secreta';

exports.ensureAuth = function(req,res,next){
	if(!req.headers.authorization){
		return res.status(403).send({message:'la peticion no tiene la cabecera de autenticacion'});
	}

	var token = req.headers.authorization.replace(/['"]+/g,'');

	try{
		var payload =jwt.decode(token, secret);

		if(payload.exp <= moment().unix()){
			return res.status(403).send({message:'token ha expirado'});
		}
	}catch(ex){
		console.log(ex);
		return res.status(403).send({message:'token no valido'});
	}

	req.user= payload;
	next();

};