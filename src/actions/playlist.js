'use strict';

const actionTypes = require('../constants/actionTypes');


module.exports.moveSong = (id, index) => {
  return {
    id: id,
    index: index,
    type: actionTypes.PLAYLIST_MOVE_SONG,
  };
};

module.exports.removeSong = id => {
  return {
    id: id,
    type: actionTypes.PLAYLIST_REMOVE_SONG,
  };
};
