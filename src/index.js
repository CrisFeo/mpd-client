'use strict';


const redux = require('redux');
const React = require('react');
const ReactDom = require('react-dom');
const Provider = require('react-redux').Provider;

const App = require('./containers/App');
const createStore = require('./store');

const store = createStore();

ReactDom.render(<Provider store={store}>
                  <App />
                </Provider>,
                document.querySelector('[data-id="container"]'));
