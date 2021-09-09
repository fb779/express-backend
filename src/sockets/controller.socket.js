const {Socket} = require('socket.io');

module.exports = {
  socketController: (socket, io) => {
    socket.on('disconnect', () => {
      console.log('desconectado del socket: ', socket.id);
    });
    console.log('conectado al socket: ', socket.id);
  },
};
