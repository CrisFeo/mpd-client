'use strict';

const actionTypes = require('../constants/actionTypes');


module.exports.seekBack = () => {
  // TODO Start prev track
  return {
    type: actionTypes.PLAYBACK_TOGGLE,
    isPlaying: false,
  };
};

module.exports.seekForeward = () => {
  // TODO Start next track
  return {
    type: actionTypes.PLAYBACK_TOGGLE,
    isPlaying: false,
  };
};

module.exports.toggle = isPlaying => {
  // TODO Start/stop current track
  return {
    type: actionTypes.PLAYBACK_TOGGLE,
    isPlaying: isPlaying,
  };
};
