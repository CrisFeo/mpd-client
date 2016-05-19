'use strict';

const redux = require('redux');

const middleware = require('../middleware');
const reducers = require('../reducers');


const createStore = () => {
  const updateDevTools = window.devToolsExtension ? window.devToolsExtension()
                                                  : x => x;
  const allMiddleware = redux.applyMiddleware(
    middleware.catchAll,
    middleware.thunk
  );
  return redux.createStore(
    reducers,
    redux.compose(allMiddleware, updateDevTools));
};

module.exports = createStore;
