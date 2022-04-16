const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
        this.creted = new Date().getTime();
        this.attend = null;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.toDay = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        this.init();
    }

    get toJson() {
        return {
            last: this.last,
            toDay: this.toDay,
            tickets: this.tickets,
            lastFour: this.lastFour,
        };
    }

    init() {
        const {toDay, last, tickets, lastFour} = require('../../db/data.json');

        if (toDay === this.toDay) {
            this.last = last;
            this.tickets = tickets;
            this.lastFour = lastFour;
        } else {
            this.saveDb();
        }
    }

    saveDb() {
        const pathDb = path.join(__dirname, '..', '..', 'db', 'data.json');

        fs.writeFileSync(pathDb, JSON.stringify(this.toJson));
    }

    nextTicket() {
        this.last++;
        const tk = new Ticket(this.last, null);
        this.tickets.push(tk);
        this.saveDb();
        return `Ticket: ${tk.number}`;
    }

    attend(desktop) {
        if (this.tickets.length === 0) {
            return null;
        }

        const ticket = this.tickets.shift(); // extract the first ticket of the list
        ticket.desktop = desktop;
        ticket.attend = new Date().getTime();

        this._updateLastFour(ticket);

        this.saveDb();

        return ticket;
    }

    _updateLastFour(ticket) {
        // this.lastFour.splice(0, 0, ticket);
        this.lastFour.unshift(ticket);

        if (this.lastFour.length > 4) {
            this.lastFour.pop();
        }
    }
}

module.exports = TicketControl;
