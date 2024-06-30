const {TicketSocketController} = require('./tickets/ticket.socket');
const {ChatSocketController} = require('./chat/chat.socket');
const Notifier = require('../class/notifications');

const GenericControllerSk = (io) => {
    // const generic = io.of('/');
    const generic = io;
    generic.on('connection', (client) => {
        console.log('conectado al socket generico: ', client.id);

        client.on('disconnect', () => {
            console.log('desconectado del socket: ', client.id);
        });

        client.on('send-message', (payload, cb) => {
            payload = Object.assign(payload, {user_id: client.id});

            cb && cb(payload);

            client.broadcast.emit('send-message', payload);
        });
    });
};

const TicketControllerSk = (io) => {
    const ticketSK = io.of('/tickets');
    ticketSK.on('connection', (socket) => TicketSocketController(socket, ticketSK));
    Notifier.setInstance(ticketSK);
};

const ChatControllerSk = (io) => {
    const chatSK = io.of('/chat');
    chatSK.on('connection', (socket) => ChatSocketController(socket, chatSK));
};

module.exports = {
    LoadSockets: (io) => {
        GenericControllerSk(io);
        TicketControllerSk(io);
        ChatControllerSk(io);
    },
};
