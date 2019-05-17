const express = require('express');
const paginate = require('express-paginate');
const session = require("express-session");
const bodyParser = require("body-parser");
// Requiring passport as we've configured it
const passport = require("../../../config/passport");

class Server {
  constructor({ config, router, logger }) {
    this.config = config;
    this.logger = logger;
    this.express = express();
    this.express.use(paginate.middleware(10, 50));
    this.express.disable('x-powered-by');

    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.json());
    this.express.use(express.static("public"));
    // We need to use sessions to keep track of our user's login status
    this.express.use(session({ secret: "ipr!gm!t%ch@#!", resave: true, saveUninitialized: true }));
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    this.express.use(router);
  }

  start() {
    return new Promise((resolve) => {
      const http = this.express
        .listen(this.config.web.port, () => {
          const { port } = http.address();
          this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
          resolve();
        });
    });
  }
}

module.exports = Server;
