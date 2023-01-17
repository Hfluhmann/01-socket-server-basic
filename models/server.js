// Servidore de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const Sockets  = require('./sockets');

class Server{

  constructor(){

    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer( this.app );

    // Configuracion de sockets
    this.io = socketio( this.server, { /* configuraciones */ });
  }

  middleswares(){
    this.app.use( express.static( path.resolve( __dirname, '../public') ) );
  }

  configurarSockets(){
    new Sockets( this.io );
  }
  
  execute(){

    // Inicializar Middlewares
    this.middleswares();

    // Inicializar Sockets
    this.configurarSockets();

    // Inicializar Server
    this.server.listen( this.port, () => {
      console.log("Corriendo en puerto", this.port);
    })
  }

}

module.exports = Server;