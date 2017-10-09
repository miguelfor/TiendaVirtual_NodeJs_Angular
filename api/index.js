'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977; 
//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tienda',(err,res)=>{
	if(err){
		throw err;
	}else{
		console.log("La base de datos esta corrinedo");

		app.listen(port, function(){
			console.log("servidor de apiRest esta escuchando en http://localhost:"+port);
		});
	}
});