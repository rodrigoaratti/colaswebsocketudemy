var socket = io();
var label = $('small');

var searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

var escritorio = searchParams.get('escritorio');
$('h1').text('Escritorio ' + escritorio);

socket.on('connect', function() {
    console.log('Nos Conectamos')
});

socket.on('disconnect', function() {
    console.log('Se perdio la conexión con el server')
})

socket.on('estadoActual', function(data) {
    label.text(data.ultimo)
})

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(data) {
        if (data.ok) {

            label.text('Ticket ' + data.ticket.numero);
            socket.emit('actualizarDatos', {});
        }


    })
})