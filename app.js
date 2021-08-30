require('dotenv').config();
const Server = require('./src/class/server');

var server = new Server();

var app = server.app;

module.exports = app;
