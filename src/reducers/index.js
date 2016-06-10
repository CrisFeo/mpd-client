'use strict';

const R = require('ramda');
const redux = require('redux');

const actionTypes = require('../constants/actionTypes');
const util = require('./utilities');


const BLANK_TRACK = {
  artist: '',
  albumImage: 'http://placehold.it/300',
  duration: 0,
  index: -1,
  title: '',
  uri: '',
}

const currentIndex =util.withDefault(0, (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENT_INDEX: return action.value;
    default:                               return state;
  }
});

const currentTrack = util.withDefault(BLANK_TRACK, (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENT_TRACK: return action.value;
    case actionTypes.UPDATE_ALBUM_IMAGE:   return Object.assign({ albumImage: value }, state);
    default:                               return state;
  }
});

const elapsed = util.withDefault(0, (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_ELAPSED: return action.value;
    default:                         return state;
  }
});

const playbackState = util.withDefault('stopped', (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PLAYBACK_STATE: return action.value;
    default:                         return state;
  }
});

const tracks = util.withDefault([BLANK_TRACK], (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PLAYLIST_TRACKS:  return action.value;
    default:                                  return state;
  }
});

module.exports = redux.combineReducers({
  currentIndex: currentIndex,
  currentTrack: currentTrack,
  elapsed: elapsed,
  playbackState: playbackState,
  tracks: tracks,
});
