'use strict';

const redux = require('redux');

const actionTypes = require('../constants/actionTypes');


const currentTrack = (state, action) => {
  switch (action.type) {
  // TODO
  default:
    return state;
  }
};

const isPlaying = (state, action) => {
  switch (action.type) {
  case actionTypes.PLAYBACK_TOGGLE:
    return action.isPlaying;
  default:
    return state;
  }
};

const isSearching = (state, action) => {
  switch (action.type) {
  case actionTypes.SEARCH_TOGGLE:
    return action.isEnabled;
  default:
    return state;
  }
};

const playlist = (state, action) => {
};

module.exports = redux.combineReducers({
  currentTrack: currentTrack,
  isPlaying: isPlaying,
  isSearching: isSearching,
  playlist: playlist,
  searchResults: searchResults,
  searchQuery: searchQuery,
});
