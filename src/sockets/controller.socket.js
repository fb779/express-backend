module.exports = {
    socketController: (client, io) => {
        console.log('conectado al socket: ', client.id);

        client.on('disconnect', () => {
            console.log('desconectado del socket: ', client.id);
        });

        client.on('send-message', (payload, cb) => {
            payload = Object.assign(payload, {user_id: client.id});

            cb && cb(payload);

            client.broadcast.emit('send-message', payload);
        });
    },
};
