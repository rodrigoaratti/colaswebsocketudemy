var socket = io();


var label = $('#lblNuevoTicket');
socket.on('connect', function() {
    console.log('Nos Conectamos')
});

socket.on('disconnect', function() {
    console.log('Se perdio la conexión con el server')
})

socket.on('estadoActual', function(data) {
    label.text('Ticket ' + data.ultimo)
})

$('button').on('click', function() {
    socket.emit('siguienteTicket', { escritorio: 1 }, function(ticket) {

        label.text(ticket.ticket);

    })
})