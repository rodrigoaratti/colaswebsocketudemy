const fs = require("fs");
const { timeStamp } = require("console");

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        if (this.hoy === data.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }
    }

    siguiente() {
        this.ultimo = this.ultimo + 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarDatos();

        return `Ticket ${this.ultimo}`
    }

    getUltimoTicket() {
        return this.ultimo;
    }

    getUltimosCuatro() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return { ok: false, msg: 'No hay mas tickets' }
        }
        let numeroTicket = this.tickets[0].numero;

        let ticket = new Ticket(numeroTicket, escritorio);
        this.tickets.shift();
        this.ultimos4.unshift(ticket);
        if (this.ultimos4.length > 4)
            this.ultimos4.splice(-1, 1);
        this.grabarDatos();

        return ticket;
    }
    reiniciarConteo() {
        this.ultimo = 0;
        this.grabarDatos();
        this.tickets = [];
        this.ultimos4 = [];
    }
    grabarDatos() {
        let datos = { ultimo: this.ultimo, hoy: this.hoy, tickets: this.tickets, ultimos4: this.ultimos4 };
        console.log(datos);
        let datosStr = JSON.stringify(datos);
        fs.writeFileSync("./server/data/data.json", datosStr);
    }


}



module.exports = { TicketControl }