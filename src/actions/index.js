'use strict';

const R = require('ramda');

const actionTypes = require('../constants/actionTypes');
const mpd = require('./api/mpd');


const togglePlayback = () => (dispatch, getState) => {
  if (getState().playbackState === 'playing') {
    mpd.pause().catch(err => console.error('error pausing', err));
  } else {
    mpd.play().catch(err => console.error('error playing', err));
  }
};

const skipTrack = () => () => mpd.nextTrack().catch(err => console.error('error skipping track', err));

module.exports = {
  skipTrack: skipTrack,
  togglePlayback: togglePlayback,
};
