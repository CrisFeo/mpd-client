'use strict';

const actionTypes = require('../constants/actionTypes');


const togglePlayback = () => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: actionTypes.UPDATE_PLAYING,
    value: !state.isPlaying,
  });
}

module.exports = {
  togglePlayback: togglePlayback,
};
