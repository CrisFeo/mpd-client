'use strict';

const actionTypes = require('../constants/actionTypes');


module.exports.blur = () => {
  return {
    isEnabled: false,
    type: actionTypes.SEARCH_TOGGLE,
  };
};

module.exports.change = query => {
  return {
    type: actionTypes.SEARCH_CHANGE,
    query: query,
  };
};

module.exports.focus = () => {
  return {
    isEnabled: true,
    type: actionTypes.SEARCH_TOGGLE,
  };
};

module.exports.select = id => {
  return {
    id: id,
    type: actionTypes.SEARCH_SELECT,
  };
};
