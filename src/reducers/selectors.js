'use strict';

const R = require('ramda');
const reselect = require('reselect');
const S = require('sanctuary');


const playedTracks = reselect.createSelector(
  [R.prop('currentIndex'), R.prop('tracks')],
  (currentIndex, tracks) =>S.pipe([
      R.reject(R.propEq('id', 'INIT')),
      R.take(currentIndex),
      R.takeLast(3),
  ])(tracks)
);

const upcomingTracks = reselect.createSelector(
  [R.prop('currentIndex'), R.prop('tracks')],
  (currentIndex, tracks) => R.drop(currentIndex + 1, tracks)
);


module.exports = {
  playedTracks: playedTracks,
  upcomingTracks: upcomingTracks,
};
