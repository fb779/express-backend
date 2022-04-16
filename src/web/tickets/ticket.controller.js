module.exports = {
    home: (req, res) => {
        const title = 'Tickets';

        const scripts = ['ticket-socket.js'];

        res.render(`ticket/tk-home`, {title, scripts, layout: 'ticket-main'});
    },

    ticket_new: (req, res) => {
        const title = 'Tickets - new';

        const scripts = ['ticket-new.js'];

        res.render(`ticket/tk-new`, {title, scripts, layout: 'ticket-main'});
    },

    ticket_screen: (req, res) => {
        const title = 'Tickets';

        const scripts = ['ticket-screen.js'];

        res.render(`ticket/tk-screen`, {title, scripts, layout: 'ticket-main'});
    },

    ticket_desktop: (req, res) => {
        const title = 'Tickets';

        const scripts = ['ticket-desktop.js'];

        res.render(`ticket/tk-desktop`, {title, scripts, layout: 'ticket-main'});
    },
};
