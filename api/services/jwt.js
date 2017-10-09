'use strict'

var jwt = require ('jwt-simple');
//dentro payload fecha creacion y fecha de expiracion
var moment = require('moment');
var secret='clave_secreta';

exports.createToken = function(user){
	var payload={
		//id del objeto	
		sub: user.id,
		name:user.name,
		surname:user.surname,
		email:user.email,
		role:user.rol,
		image:user.image,
		iat:moment().unix(),
		exp:moment().add(30,'days').unix()
	};
	return jwt.encode(payload,secret);
};
