/** Imports */
const path = require('path');
const {createServer} = require('http');
const io = require('socket.io');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const exphbs = require('express-handlebars');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const {
  server: {PORT},
} = require('../../config/config');

const {normalizePort} = require('../helpers/normalizePort');

const {dbConnection} = require('../database/mongoose-config.db');

const {socketController} = require('../sockets/controller.socket');

const indexRouter = require('../routes/index');

const rootDirectory = path.join(__dirname, '..', '..');

class Server {
  constructor() {
    this.app = express();

    this.server = createServer(this.app);

    this.io = io(this.server);

    // Set the port value
    this.definePort();

    // Middlewares
    this.middlewares();

    // View engine
    this.viewEngine();

    // Routes
    this.routes();

    // Error handler routes
    this.routesHandleError();

    // socket configurations
    this.sockets();
  }

  /**
   * Get port from environment and store in Express.
   */
  definePort() {
    this.port = normalizePort(PORT);
    if (!this.port) {
      throw new Error(`Port is not define`);
    }
    this.app.set('port', this.port);
  }

  viewEngine() {
    const hbs = exphbs.create({
      defaultLayout: 'main.hbs',
      layoutsDir: path.join(rootDirectory, 'views', 'layouts'),
      partialsDir: path.join(rootDirectory, 'views', 'partials'),
      extname: 'hbs',
    });

    // Define the name template engine
    const hbsName = 'hbs';

    //Sets handlebars configurations (we will go through them later on)
    this.app.engine(hbsName, hbs.engine);

    //Sets our app to use the handlebars engine
    this.app.set('view engine', hbsName);
  }

  middlewares() {
    this.app.use(logger('dev'));

    this.app.use(cors());

    this.app.use(helmet());

    this.app.use(express.json());

    this.app.use(express.urlencoded({extended: false}));

    this.app.use(cookieParser());

    this.app.use(express.static(path.join(rootDirectory, 'public')));
  }

  routes() {
    this.app.use('/', indexRouter);
  }

  routesHandleError() {
    // catch 404 and forward to error handler
    this.app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    this.app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // response error API
      if (req.originalUrl.includes('/api')) {
        res.status(err.status || 500).json({ok: false, message: err.message});
        return;
      }

      // render the error page
      res.status(err.status || 500);
      res.render('error', {title: '404-Error'});
    });
  }

  sockets() {
    this.io.on('connection', (socket) => socketController(socket, this.io));
  }

  async listen() {
    /** Database conecction */
    await dbConnection();

    /** Start to listen server */
    this.server.listen(this.port, () => {
      console.log(`Server runnign on port: ${this.port}`);
    });
  }
}

module.exports = Server;
