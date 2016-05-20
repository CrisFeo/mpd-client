'use strict';


const redux = require('redux');
const React = require('react');
const ReactDom = require('react-dom');
const Provider = require('react-redux').Provider;

const actions = require('./actions');
const App = require('./containers/App');
const createStore = require('./store');

const store = createStore();

window.store = store;
window.mpd = require('./actions/api/mpd');

setInterval(() => store.dispatch(actions.pollServer()), 1000);

ReactDom.render(<Provider store={store}>
                  <App />
                </Provider>,
                document.querySelector('[data-id="container"]'));
