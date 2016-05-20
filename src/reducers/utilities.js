'use strict';


// withDefault :: (State, (State, Action) => State) => (State, Action) => State
// State  :: Object
// Action :: { type :: String
//           , *    :: *      }
//
// Wraps a reducer such that if the passed in state is null, sets the inital
// state to the provided default.
const withDefault = (def, reducer) => (state, action) => {
  const currentState = state == null ? def : state;
  return reducer(currentState, action);
};

// merge :: (Object, Object) -> Object
//
// Convenience method that returns a new object representing the union of
// the two provided objects. In the case of matching properties, the second
// object will overwrite the first.
const merge = (a, b) => Object.assign({}, a, b);


module.exports = {
  withDefault: withDefault,
  merge: merge,
};
