const {Socket} = require('socket.io');

module.exports = {
  //TODO: remover = new Socket()
  socketController: (socket = new Socket()) => {
    socket.on('disconnect', () => {
      console.log('desconectado del socket: ', socket.id);
    });
    console.log('conectado al socket: ', socket.id);
  },
};
