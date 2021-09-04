/** Imports */
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const exphbs = require('express-handlebars');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const {normalizePort} = require('../helpers/normalizePort');

const rootDirectory = path.join(__dirname, '..', '..');

const indexRouter = require('../routes/index');

class Server {
  app;
  port;

  constructor() {
    this.app = express();

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
  }

  /**
   * Get port from environment and store in Express.
   */
  definePort() {
    this.port = normalizePort(process.env.PORT || '3001');
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
    this.app.use(cors());
    this.app.use(helmet());

    this.app.use(logger('dev'));

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

      // render the error page
      res.status(err.status || 500);
      res.render('error', {title: '404-Error'});
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server runnign on port: ${this.port}`);
    });
  }

  get app() {
    return this.app;
  }
}

module.exports = Server;
