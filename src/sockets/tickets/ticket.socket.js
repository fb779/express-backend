const TicketControl = require('../../class/tickets-control');

const ticketCtrl = new TicketControl();

module.exports = {
    TicketSocketController: (client, io) => {
        // client.on('disconnect', () => {
        //     console.log('desconectado del socket de tickets: ', client.id);
        // });

        // TODO: carga inicial del ultimo ticket creado
        client.emit('last-ticket', ticketCtrl.last ? `Ticket: ${ticketCtrl.last}` : `Without Tickets...`);

        // TODO: event of new ticket
        client.on('tk-next', (payload, cb) => {
            const next_ticket = ticketCtrl.nextTicket();

            cb && cb(next_ticket);

            // HACK: Notificar la creacion de un nuevo ticket
        });
    },
};
