

# Ecommerce Node API

An eCommerce platform for Node web APIs focused on separation of concerns and scalability. The app is deployed on heroku and APIs documentation is available at https://ipragmatech-ecommmerce.herokuapp.com/api/docs

## Features

<dl>
  <dt>Multilayer folder structure</dt>
  <dd>
    <a href="https://github.com/talyssonoc/node-api-boilerplate/wiki/Folder-structure">Code organization</a> inspired by <a href="http://dddcommunity.org/">DDD</a> and <a href="https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html">Clean Architecture</a> focused on codebase scalability.
  </dd>

  <dt>Instant feedback and reload</dt>
  <dd>
    Use <a href="https://www.npmjs.com/package/nodemon">Nodemon</a> to automatically reload the server after a file change when on development mode, makes the development faster and easier.
  </dd>

  <dt>Ready for production</dt>
  <dd>
    Setup with <a href="https://www.npmjs.com/package/pm2">PM2</a> process manager ready to go live on production. It's also out-of-box ready to be deployed at Heroku, you can read more about it <a href="https://github.com/talyssonoc/node-api-boilerplate/wiki/Setup-in-Heroku">here</a>.
  </dd>

  <dt>Scalable and easy to use web server</dt>
  <dd>
    Use <a href="https://www.npmjs.com/package/express">Express</a> for requests routing and middlewares. There are some essential middlewares for web APIs already setup, like <a href="https://www.npmjs.com/package/body-parser">body-parser</a>, <a href="https://www.npmjs.com/package/compression">compression</a>, <a href="https://www.npmjs.com/package/cors">CORS</a> and <a href="https://www.npmjs.com/package/method-override">method-override</a>.
  </dd>

  <dt>Database integration</dt>
  <dd>
    <a href="https://www.npmjs.com/package/sequelize">Sequelize</a>, an ORM for SQL databases, is already integrated, you just have to set the <a href="https://github.com/talyssonoc/node-api-boilerplate/wiki/Database-setup">authentication configurations</a>.
  </dd>

  <dt>Prepared for testing</dt>
  <dd>
    The test suite uses <a href="https://www.npmjs.com/package/mocha">Mocha</a>/<a href="https://www.npmjs.com/package/chai">Chai</a> and is prepared to run unit, integration and functional tests right from the beginning. There are helpers to <a href="https://github.com/talyssonoc/node-api-boilerplate/wiki/The-test-suite">make it easy to make requests to the web app during the tests and for cleaning the database after each test</a>. A <a href="https://www.npmjs.com/package/factory-girl">FactoryGirl</a> adapter for Sequelize is setup to make your tests DRY as well, and the tests generate code coverage measurement with <a href="https://www.npmjs.com/package/istanbul">Istanbul</a>. You should read about the <a href="https://github.com/talyssonoc/node-api-boilerplate/wiki/Chai-plugins">Chai plugins that are setup by default too</a>.
  </dd>

  <dt>Dependency injection</dt>
  <dd>
    With <a href="https://www.npmjs.com/package/awilix">Awilix</a>, a practical dependency injection library, the code will not be coupled and it'll still be easy to resolve automatically the dependencies on the runtime and mock them during the tests. It's even possible inject dependencies on your controllers with the <a href="https://www.npmjs.com/package/awilix-express">Awilix Express adapter</a>. Click <a href="https://github.com/talyssonoc/node-api-boilerplate/wiki/Dependency-injection-container">here</a> if you want to read more about how to use dependency injection with this boilerplate.
  </dd>

  <dt>CLI integration</dt>
  <dd>
    Both the application and Sequelize have command-line tools to make it easy to work with them. Check the <a href="#scripts">Scripts</a> section to know more about this feature.
  </dd>

  <dt>Logging</dt>
  <dd>
    The <a href="https://www.npmjs.com/package/log4js">Log4js</a> logger is highly pluggable, being able to append the messages to a file during the development and send them to a logging service when on production. Even the requests (through <a href="https://www.npmjs.com/package/morgan">morgan</a>) and queries will be logged.
  </dd>

  <dt>Linter</dt>
  <dd>
    It's also setup with <a href="https://www.npmjs.com/package/eslint">ESLint</a> to make it easy to ensure a code styling and find code smells.
  </dd>
</dl>

## Quick start

This platform have the basic web APIs for ecommerce app. The platform uses backend as my sql database but can be used for other platforms like firebase, dynamodb etc.  

1. Download the source code file or clone it from [https://github.com/ipragmatechadmin/React-Ecommerce-Builder](https://github.com/ipragmatechadmin/React-Ecommerce-Builder).
2. Setup the database on `config/database.js` with the MySQL database configurations.
3. Install the dependencies with `yarn` (click here if [you don't have Yarn installed](https://yarnpkg.com/docs/install))
4. Create the development and test databases you have setup on `config/database.js`
5. Run the database script located at  `src/infra/database scripts`. This shall create the sample data along with tables and store procedures.
7. Run the application in development mode with `npm run dev`
8. Access `http://localhost:3000/api/docs` and you can check the APIs documentation. You can test the APIs by change the baseURL. you're ready to go!

## Scripts

This boilerplate comes with a collection of npm scripts to make your life easier, you'll run them with `npm run <script name>` or `yarn run <script name>`:

- `dev`: Run the application in development mode
- `start` Run the application in production mode (prefer not to do that in development)
- `test`: Run the test suite
- `test:unit`: Run only the unit tests
- `test:features`: Run only the features tests
- `test:single`: Run only the single test case
- `coverage`: Run only the unit tests and generate code coverage for them, the output will be on `coverage` folder
- `lint`: Lint the codebase
- `sequelize`: Alias to the [Sequelize CLI](https://github.com/sequelize/cli)
- `console`: Open the built-in console, you can access the DI container through the `container` variable once it's open, the console is promise-friendly. Click [here](https://github.com/talyssonoc/node-api-boilerplate/wiki/Application-console) to know more about the built-in console

## Tech

- [Node v7.6+](http://nodejs.org/)
- [Express](https://npmjs.com/package/express)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [Awilix](https://www.npmjs.com/package/awilix)
- [Structure](https://www.npmjs.com/package/structure)
- [HTTP Status](https://www.npmjs.com/package/http-status)
- [Log4js](https://www.npmjs.com/package/log4js)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Express Status Monitor](https://www.npmjs.com/package/express-status-monitor)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [PM2](https://www.npmjs.com/package/pm2)
- [Mocha](https://www.npmjs.com/package/mocha)
- [Chai](https://www.npmjs.com/package/chai)
- [FactoryGirl](https://www.npmjs.com/package/factory-girl)
- [Istanbul](https://www.npmjs.com/package/istanbul) + [NYC](https://www.npmjs.com/package/nyc)
- [ESLint](https://www.npmjs.com/package/eslint)

## ToDo (v1.1)
- Add support for data migration and seed data using Sequelize
- Add Additional APIs to support Sociallogin.
- Additional APIs for ecommerce (My Orders, Create Products etc)
- Additional Test cases to complete more cases.
