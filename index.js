const express = require('express');
const path = require('path');
require('dotenv').config();

// App de express
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');









// Public Path
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ));

// Server thread:
server.listen( process.env.PORT, ( error) => {
    if ( error ) throw new Error(error);

    console.log('Servidor en marcha en el puerto', process.env.PORT );
});