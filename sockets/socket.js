
const { io } = require('../index');

// Socket messages
io.on('connection', client => {
    console.log('Cliente conectado. ON')

  client.on('disconnect', () => { 
    console.log('Cliente desconectado. OFF');
   });
   
   client.on('mensaje', (payload) => {
    console.log('Mensaje recibido! ', payload);

    io.emit('mensaje', { admin: 'Nuevo mensaje'} );
   })
});
