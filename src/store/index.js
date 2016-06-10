'use strict';

const redux = require('redux');

const api = require('../api');
const middleware = require('../middleware');
const reducers = require('../reducers');


// createStore :: String -> Store
const createStore = apiOrigin => {
  const updateDevTools = window.devToolsExtension ? window.devToolsExtension()
                                                  : x => x;
  const mopidy = api.create(apiOrigin);
  const allMiddleware = redux.applyMiddleware(
    middleware.catchAll,
    middleware.apiOrchestrator(mopidy)
  );
  const store = redux.createStore(
    reducers,
    redux.compose(allMiddleware, updateDevTools));
  api.start(mopidy, store.dispatch);
  return store;
};

module.exports = createStore;
