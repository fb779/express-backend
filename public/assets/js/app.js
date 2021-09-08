const socket = io();

socket.on('connection', (socket) => {
  console.log('hola desde el cliente');
});
