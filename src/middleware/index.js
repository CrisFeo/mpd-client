'use strict';

const Future = require('fluture');
const R = require('ramda');
const S = require('sanctuary');


// catchAll :: Store -> (Action -> Action) -> Action -> Action
const catchAll = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error(S.unlines(['Caught an exception!',
                             err.message,
                             err.stack]));
    throw err;
  }
};

// apiOrchestrator :: MopidyApi -> Store -> (Action -> Action) -> Action -> Action
const apiOrchestrator = mopidy => store => next => action => {
  if (typeof action === 'function') {
    const future = action(mopidy);
    if (Future.isFuture(future) === true) {
      future.fork(err => console.error(err),
                  R.map(store.dispatch));
    } else {
      throw new Error('Dispatched function must return a Future');
    }
  } else {
    next(action);
  }
};

module.exports = {
  apiOrchestrator: apiOrchestrator,
  catchAll: catchAll,
};
