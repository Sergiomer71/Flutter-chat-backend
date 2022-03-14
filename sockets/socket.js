const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } =  require('../controllers/socket');


// Mensajes de Sockets
io.on('connection',  (client) => {
    console.log('Cliente conectado');

    // console.log( client.handshake.headers['x-token']);
    const [ valido, uid]= comprobarJWT( client.handshake.headers['x-token'] )

    // console.log(valido, uid);
    // Verificar autenticación
    if ( !valido ) { return client.disconnect();}

    // console.log('cliente autenticado')
    // Cliente autenticado
    usuarioConectado( uid );

    // INgresar al usuario a una sala en particular
    // Sala global, 
    // para enviar un mensaje privado lo hago en el client.id
    client.join( uid );

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async (payload) => {
        // console.log(payload);
        // TODO: Grabar mensaje
        await grabarMensaje( payload );
        io.to( payload.para ).emit('mensaje-personal', payload);
    })
      

    client.on('disconnect', () => {
        // console.log('Cliente desconectado');
        usuarioDesconectado( uid );
    });

    

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
