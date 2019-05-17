

<!-- Logo -->
<p align="center">
  <a href="[https://github.com/ipragmatechadmin/React-Ecommerce-Builder](https://github.com/ipragmatechadmin/React-Ecommerce-Builder)">
    <img height="128" width="160" src="https://www.ipragmatech.com/wp-content/uploads/2017/06/logo.png">
  </a>
</p>
<!-- Name -->
<h1 align="center">
  <a href="https://github.com/ipragmatechadmin/React-Ecommerce-Builder">React Ecommerce</a>
</h1>
<br/>
The React Ecommerce is a project relying on [React](https://facebook.github.io/react/docs/hello-world.html) a powerful javascript library for building the user interface. In this project, I tried to show some features of react/react components as a ecommerce platform.
The structure of this project give the ability to developer to develop their project on their own idea and environment.

<p align="center">
  <a href="https://react-ipragmatech-ecommerce.herokuapp.com/">
    <img src="https://s3.amazonaws.com/react-ecommerce-ipragmatech/mockup.png">
  </a>
</p>


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

 Install [NodeJs](https://nodejs.org/en/)

#### Note

 - If you're using Windows you should install all node-gyp dependencies with following commands:

`$ npm install --global --production windows-build-tools`
and then install the package

`$ npm install --global node-gyp`


### Installing

1. Download the source code file or clone it from [https://github.com/ipragmatechadmin/React-Ecommerce-Builder](https://github.com/ipragmatechadmin/React-Ecommerce-Builder).

2. Go to the project root directory
   ```bash
   cd react-ecommerce
   ```
3. To install node dependencies use
  ```bash
  npm install
  ```
  OR
  ```bash
  yarn install
  ```
4. Open environment config and set the APIs URL. React Ecommerce is able to be connected with current Node Web APIs. Once done we are ready to use the ecommerce app.
    ```bash
    npm start
    ```

## Project Details
### Structure
The current structure could make the project easy to change and scale up.
Using the currect structure we are able to develop the mobile app in parallel with web app **only** with changing `Components` layer. It means we can keep `Core`, `Data` layers, `Actions`, `Reducers`, etc. What we have high reusability and fast in producing the products. So here is the structure of the project:
# API

Is a decoupled layer of interfaces to data and/or functionality of one or more components.

# Actions

This layer is responsible for implementing actions for entities. [Actions](http://redux.js.org/docs/basics/Actions.html) are payloads of information that send data from your application to your store. They are the only source of information for the store.

# Containers

This layer include [React components](https://facebook.github.io/react/docs/react-component.html) that let you split the UI into independent, reusable pieces, and think about each piece in isolation.

# Components

This layer include [React components](https://facebook.github.io/react/docs/react-component.html) that let you split the UI into independent, reusable pieces, and think about each piece in isolation.

# Constants

This layer is responsible for setting constant virables, such as action type names for redux actions. Actions must have a type property that indicates the type of action being performed. Types should typically be defined as string constants.

# Data
This layer is responsible for interacting with the external webservices to pull or push the data.

# Reducers

This layer is included reducers of entities. [Reducers](http://redux.js.org/docs/basics/Reducers.html) specify how the application's state changes in response.

# Store

This layer is responsible for configuring of redux store, such as setting reducers and midelwares. A [store](http://redux.js.org/docs/api/Store.html) holds the whole state tree of your application.



### Features
  - Product listing
  - Search the product by text
  - Product Details
  - Login and Signup
  - Add to cart
  - Payment through paypal
  - Update Shipping Details

## Built With

  * [TypeScript](https://www.typescriptlang.org/) TypeScript is a superset of JavaScript that compiles to clean JavaScript output.
  * [JSX/TSX](https://jsx.github.io/) This project support both *.jsx and *.tsx files. JSX is a statically-typed, object-oriented programming language designed to run on modern web browsers. Being developed at DeNA as a research project, the language has following characteristics.
  * [React](https://facebook.github.io/react/docs/hello-world.html) A javascript library for building user interfaces.
  * [Redux](http://redux.js.org/) is a predictable state container for JavaScript apps.
  * [Material-UI](http://www.material-ui.com/#/) A Set of React Components that Implement Google's Material Design.
  * [react-redux](https://github.com/reactjs/react-redux) Official React bindings for Redux.
  * [redux-saga](https://redux-saga.js.org/) is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, simple to test, and better at handling failures.
  * [redux-thunk](https://github.com/gaearon/redux-thunk) Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
  * [React Router V4](https://github.com/ReactTraining/react-router) for routing website location
  * [Sass](http://sass-lang.com/) CSS with superpowers. Sass boasts more features and abilities than any other CSS extension language out there.
  * [InversifyJS](http://inversify.io/) InversifyJS is a lightweight (4KB) inversion of control (IoC) container for TypeScript and JavaScript apps. A IoC container uses a class constructor to identify and inject its dependencies.
  * [create-react-app](https://github.com/facebook/create-react-app) Create React App is a tool built by developers at Facebook to help you build React applications. It saves you from time-consuming setup and configuration. You simply run one command and create react app sets up the tools you need to start your React project.
