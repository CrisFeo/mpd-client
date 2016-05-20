'use strict';

const R = require('ramda');

const actionTypes = require('../constants/actionTypes');
const mpd = require('./api/mpd');


const togglePlayback = () => (dispatch, getState) => {
  if (getState().playbackState === 'playing') {
    dispatch({ type: actionTypes.UPDATE_PLAYBACK_STATE, value: 'paused' });
    mpd.pause().catch(err => console.error('error pausing', err));
  } else {
    dispatch({ type: actionTypes.UPDATE_PLAYBACK_STATE, value: 'playing' });
    mpd.play().catch(err => console.error('error playing', err));
  }
};

const skipTrack = () => () => mpd.nextTrack().catch(err => console.error('error skipping track', err));

const updateCurrentIndex = () => (dispatch, getState) => {
  mpd.getCurrentIndex()
  .then(newIndex => {
    const currentIndex = getState().currentIndex;
    if (newIndex !== currentIndex) {
      dispatch({ type: actionTypes.UPDATE_CURRENT_INDEX, value: newIndex });
    }
  })
  .catch(err => console.error('error updating current track', err))
};

const updateCurrentTrack = () => (dispatch, getState) => {
  mpd.getCurrentTrack()
  .then(newTrack => {
    const currentTrack = getState().currentTrack;
    if (newTrack.id !== currentTrack.id) {
      dispatch({ type: actionTypes.UPDATE_CURRENT_TRACK, newTrack: newTrack, oldTrack: currentTrack });
    }
  })
  .catch(err => console.error('error updating current track', err))
};

const updateElapsed = () => (dispatch, getState) => {
  mpd.getElapsed()
  .then(newElapsed => {
    const currentElapsed = getState().elapsed;
    if (newElapsed !== currentElapsed) {
      dispatch({ type: actionTypes.UPDATE_ELAPSED, value: newElapsed });
    }
  })
  .catch(err => console.error('error updating current elapsed time', err))
};

const updatePlaybackState = () => (dispatch, getState) =>
  mpd.getPlaybackState()
  .then(newPlaybackState => {
    const currentPlaybackState = getState().playbackState;
    if (newPlaybackState !== currentPlaybackState) {
      dispatch({ type: actionTypes.UPDATE_PLAYBACK_STATE, value: newPlaybackState });
    }
  })
  .catch(err => console.error('error updating playback state', err))

const updateTracks = () => (dispatch, getState) =>
  mpd.getTracks()
  .then(newTracks => {
    const currentTracks = getState().tracks;
    if (!R.equals(newTracks, currentTracks)) {
      dispatch({ type: actionTypes.UPDATE_TRACKS, value: newTracks });
    }
  })
  .catch(err => console.error('error updating tracks', err))

const pollServer = () => (dispatch, getState) => {
  dispatch(updateCurrentIndex());
  dispatch(updateCurrentTrack());
  dispatch(updateElapsed());
  dispatch(updatePlaybackState());
  dispatch(updateTracks());
};

module.exports = {
  pollServer: pollServer,
  skipTrack: skipTrack,
  togglePlayback: togglePlayback,
};
