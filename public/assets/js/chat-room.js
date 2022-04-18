/**
 * Socket client
 */

// const socket = io();

// socket.on('connect', () => {
//     console.log(`conectado al servidor`);
// });

// socket.on('disconnect', () => {
//     console.log(`desconectado del servidor`);
// });

const checkLoginUser = () => {
    const token = localStorage.getItem('token');

    return token;
};
const init = () => {
    const token = checkLoginUser();
};

init();
