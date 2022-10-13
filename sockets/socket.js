
const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band( 'Sutagar') );
bands.addBand( new Band( 'Metallica') );
bands.addBand( new Band( 'Berritxarrak') );
bands.addBand( new Band( 'Etsaiak') );

console.log('Server init.');
// console.log(bands)

// Socket messages
io.on('connection', client => {
  console.log('Cliente conectado. ON');

  client.emit('active-bands', bands.getBands() );

  client.on('disconnect', () => { 
    console.log('Cliente desconectado. OFF');
   });
   
   client.on('mensaje', (payload) => {
    console.log('Mensaje recibido! ', payload);

    io.emit('mensaje', { admin: 'Nuevo mensaje'} );
   })

//    client.on('emitir-mensaje', ( payload) => {
//     // console.log( payload );
//     // io.emit('nuevo-mensaje', 'HEY!!! ') // Emite a todos los clientes conectados
//     client.broadcast.emit('nuevo-mensaje', payload); // Emite a todos menos a uno mismo
//    })

   client.on('vote-band', (payload) => {
    // console.log(payload);
    bands.voteBand( payload.id );
    io.emit('active-bands', bands.getBands() );
   });

   client.on('add-band', (payload) => {
    const newBand = new Band( payload.name );
    bands.addBand( newBand );
    io.emit('active-bands', bands.getBands() );
   });

   client.on('delete-band', (payload) => {
    bands.deleteBand( payload.id );
    io.emit('active-bands', bands.getBands() );
   });

});
