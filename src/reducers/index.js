'use strict';

const redux = require('redux');

const actionTypes = require('../constants/actionTypes');
const util = require('./utilities');


const SAMPLE_TRACK = {
  artist: 'Red Sovine',
  albumImage: 'http://placehold.it/1000',
  duration: 207,
  title: 'Phantom 309',
}

const currentTrack = util.withDefault(SAMPLE_TRACK, (state, action) => {
  switch (action.type) {
    case actionTypes.SWITCH_TRACK: return action.nextTrack;
    default:                       return state;
  }
});

const elapsed = util.withDefault(0, (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_DURATION: return action.value;
    default:                          return state;
  }
});

const isPlaying = util.withDefault(false, (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PLAYING: return action.value;
    default:                         return state;
  }
});

const playedTracks = util.withDefault([], (state, action) => {
  switch (action.type) {
    case actionTypes.SWITCH_TRACK: return R.append(action.oldTrack,
                                                   R.takeLast(3, state));
    default:                       return state;
  }
});

const upcomingTracks = util.withDefault([], (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TRACK:    return R.append(action.newTrack, state);
    case actionTypes.SWITCH_TRACK: return R.tail(state);
    default:                       return state;
  }
});

module.exports = redux.combineReducers({
  currentTrack: currentTrack,
  elapsed: elapsed,
  isPlaying: isPlaying,
  playedTracks: playedTracks,
  upcomingTracks: upcomingTracks,
});
