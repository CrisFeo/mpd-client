'use strict';

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

// thunk :: Store -> (Action -> Action) -> Action -> Action
const thunk = store => next => action =>
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action);


module.exports = {
  catchAll: catchAll,
  thunk: thunk,
};
