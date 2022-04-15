module.exports = {
    home: (req, res) => {
        const title = 'Tickets';

        const scripts = ['ticket-socket.js'];

        res.render(`ticket/home`, {title, scripts, layout: 'ticket-main'});
    },
    screen1: (req, res) => {},
    screen2: (req, res) => {},
    screen2: (req, res) => {},
};
