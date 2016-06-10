'use strict';

const redux = require('redux');
const React = require('react');
const ReactDom = require('react-dom');
const Provider = require('react-redux').Provider;

const App = require('./containers/App');
const createStore = require('./store');
const mopidy = require('./api/mopidy');


window.store = createStore();
window.mopidy = mopidy.initialize('ws://localhost:6680/mopidy/ws',
                                  window.store.dispatch);

ReactDom.render(<Provider store={window.store}>
                  <App />
                </Provider>,
                document.querySelector('[data-id="container"]'));
