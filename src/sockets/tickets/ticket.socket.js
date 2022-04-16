const TicketControl = require('../../class/tickets-control');

const ticketCtrl = new TicketControl();

module.exports = {
    TicketSocketController: (client, io) => {
        console.log('conectado al socket de tickets: ', client.id);

        client.on('disconnect', () => {
            console.log('desconectado del socket de tickets: ', client.id);
        });
    },
};
