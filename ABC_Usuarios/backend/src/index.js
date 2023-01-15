'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app= express();
const port=3000; 

var url = 'mongodb://localhost:27017/ModeloDeUsuarios';

mongoose.Promise = global.Promise;
var usuarios_routers = require('./routes/Usuarios');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');// PUT permite modificar elementos
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api',usuarios_routers);

mongoose.connect(url,{useNewUrlParser: true}).then(()=>{
    console.log('Conexión a la base de datos se ha realizado sin problemas');
});

app.listen(port, () => { 
    console.log('Lanzando la aplicacion en el puerto'+ port);
});
