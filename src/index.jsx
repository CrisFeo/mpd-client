'use strict';

const React = require('react');
const ReactDom = require('react-dom');
const Provider = require('react-redux').Provider;

const App = require('./containers/App');
const createStore = require('./store');


ReactDom.render(<Provider store={createStore()}>
                  <App />
                </Provider>,
                document.querySelector('[data-id="container"]'));
