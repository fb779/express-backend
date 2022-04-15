const {TicketSocketController} = require('./tickets/ticket.socket');

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
        io.on('connection', (client) => {
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
        io.of('/tickets').on('connection', (socket) => TicketSocketController(socket, io));
    },

    // ChatControllerSk: (io) => {
    //     io.of('/chat').on('connection', (socket) => ChatSocketController(socket, io));
    // },
};
