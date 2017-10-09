'use strict'

var express = require('express');
var bodyParser = require ('body-parser');

var app =express();

// cargar rutas
var user_routes =require('./routes/user');
var product_routes =require('./routes/product');
/*var album_routes =require('./routes/album');
var song_routes =require('./routes/song');
*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// configurar cabeceras
app.use((req,res,next) =>{
	res.header('Access-Control-Allow-origin','*');
	res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Acces-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Method','GET, POST, OPTIONS, PUT,DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT,DELETE');

	next();
});

//ruta base
app.use('/api', user_routes);
app.use('/api', product_routes);
/*app.use('/api', user_routes);
app.use('/api', user_routes);
app.use('/api', user_routes);
*/
//rutas body-parser
/*
app.get('/pruebas', function(req,res){
	res.status(200).send({message:"esta es la primera ruta"});

});*/
module.exports = app;