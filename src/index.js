'use strict';

const redux = require('redux');
const React = require('react');
const ReactDom = require('react-dom');
const Provider = require('react-redux').Provider;

const App = require('./containers/App');
const createStore = require('./store');


window.store = createStore('ws://localhost:6680/mopidy/ws');
ReactDom.render(<Provider store={window.store}>
                  <App />
                </Provider>,
                document.querySelector('[data-id="container"]'));
