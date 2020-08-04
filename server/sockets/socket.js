const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });

    client.emit('estadoActual', {
        ultimo: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimosCuatro()
    })


    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente()
        console.log(siguiente);
        callback({ ticket: siguiente });
    })

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio)
            callback({ ok: false, msg: 'Falta el escritio en los datos' });

        let ticket = ticketControl.atenderTicket(data.escritorio);

        callback({ ok: true, ticket: ticket });
        client.broadcast.emit('ultimos4', { ultimos4: ticketControl.getUltimosCuatro() });
    })



});