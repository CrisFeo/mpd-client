'use strict';
// ActionOrchestrator :: MopidyApi -> Future Error [Action]

const Future = require('fluture');
const R = require('ramda');
const S = require('sanctuary');

const actions = require('../actions/api');
const parsers = require('./parsers');
const queries = require('./queries');


const _ = R.__;

// eitherToFuture :: Either a b -> Future a b
const eitherToFuture = S.either(Future.reject, Future.of);


// appendAlbumImage :: MopidyApi -> Track -> Future Error Track
const appendAlbumImage = R.curry((mopidy, track) => S.pipe([
  queries.getAlbumArt(track.uri),
  R.map(parsers.albumImage),
  R.chain(eitherToFuture),
  R.map(R.assoc('albumImage', _, track)),
])(mopidy))

// nextTrack :: ActionOrchestrator
const nextTrack = S.pipe([
  queries.next,
  R.map(R.always([])),
]);

// togglePlayback :: ActionOrchestrator
const togglePlayback = mopidy => S.pipe([
  queries.getPlaybackState,
  R.chain(playbackState => playbackState === 'playing' ? queries.pause(mopidy)
                                                       : queries.play(mopidy)),
  R.map(R.always([])),
])(mopidy);

// updateCurrentIndex :: ActionOrchestrator
const updateCurrentIndex = S.pipe([
  queries.getCurrentIndex,
  R.map(actions.updateCurrentIndex),
  R.map(R.of),
]);

// updateCurrentTrack :: ActionOrchestrator
const updateCurrentTrack = mopidy => S.pipe([
  queries.getCurrentTrack,
  R.map(parsers.track),
  R.chain(eitherToFuture),
  R.chain(appendAlbumImage(mopidy)),
  R.map(actions.updateCurrentTrack),
  R.map(R.of),
])(mopidy);

// updateElapsed :: ActionOrchestrator
const updateElapsed = S.pipe([
  queries.getElapsed,
  R.map(actions.updateElapsed),
  R.map(R.of),
]);

// updatePlaybackState :: ActionOrchestrator
const updatePlaybackState = S.pipe([
  queries.getPlaybackState,
  R.map(actions.updatePlaybackState),
  R.map(R.of),
]);

// updatePlaylistTracks :: ActionOrchestrator
const updatePlaylistTracks = S.pipe([
  queries.getPlaylistTracks,
  R.map(parsers.playlistTracks),
  R.chain(eitherToFuture),
  R.map(actions.updatePlaylistTracks),
  R.map(R.of),
]);

// updateAll :: ActionOrchestrator
const updateAll = S.pipe([
  S.T,
  R.map(_, [
    updateCurrentIndex,
    updateCurrentTrack,
    updateElapsed,
    updatePlaybackState,
    updatePlaylistTracks,
  ]),
  Future.parallel(Infinity),
  R.map(R.unnest),
]);

// updateCurrent :: ActionOrchestrator
const updateCurrent = S.pipe([
  S.T,
  R.map(_, [ updateCurrentIndex, updateCurrentTrack ]),
  Future.parallel(Infinity),
  R.map(R.unnest),
]);

module.exports = {
  nextTrack: nextTrack,
  togglePlayback: togglePlayback,
  updateCurrentIndex: updateCurrentIndex,
  updateCurrentTrack: updateCurrentTrack,
  updateElapsed: updateElapsed,
  updatePlaybackState: updatePlaybackState,
  updatePlaylistTracks: updatePlaylistTracks,
  updateAll: updateAll,
  updateCurrent: updateCurrent,
};
