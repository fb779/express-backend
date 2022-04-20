const {TicketSocketController} = require('./tickets/ticket.socket');
const {ChatSocketController} = require('./chat/chat.socket');

module.exports = {
    // socketController: (client, io) => {
    //     console.log('conectado al socket: ', client.id);

    //     client.on('disconnect', () => {
    //         console.log('desconectado del socket: ', client.id);
    //     });

    //     client.on('send-message', (payload, cb) => {
    //         payload = Object.assign(payload, {user_id: client.id});

    //         cb && cb(payload);

    //         client.broadcast.emit('send-message', payload);
    //     });
    // },

    GenericControllerSk: (io) => {
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
    },

    TicketControllerSk: (io) => {
        const ticketSK = io.of('/tickets');
        ticketSK.on('connection', (socket) => TicketSocketController(socket, ticketSK));
    },

    ChatControllerSk: (io) => {
        const chatSK = io.of('/chat');
        chatSK.on('connection', (socket) => ChatSocketController(socket, chatSK));
    },
};
