'use strict';

const Future = require('fluture');
const futurize = require('futurize').futurizeP(Future);
const R = require('ramda');


// addTrack :: String -> MopidyApi -> Future Error [RpcTracklistTrack]
const addTrack = R.curry((uri, mopidy) =>
  futurize(mopidy.tracklist.add)({uri: uri}));

// getAlbumArt :: String -> MopidyApi -> Future Error RpcAlbumImageResult
const getAlbumArt = R.curry((uri, mopidy) =>
  futurize(mopidy.library.getImages)({uris: [uri]}));

// getCurrentIndex :: MopidyApi -> Future Error Number
const getCurrentIndex = mopidy =>
  futurize(mopidy.tracklist.index)();

// getCurrentTrack :: MopidyApi -> Future Error RpcTrack
const getCurrentTrack = mopidy =>
  futurize(mopidy.playback.getCurrentTrack)();

// getElapsed :: MopidyApi -> Future Error Number
const getElapsed = mopidy =>
  futurize(mopidy.playback.getTimePosition)();

// getPlaybackState :: MopidyApi -> Future Error String
const getPlaybackState = mopidy =>
  futurize(mopidy.playback.getState)();

// getPlaylistTracks :: MopidyApi -> Future Error [RpcTrack]
const getPlaylistTracks = mopidy =>
  futurize(mopidy.tracklist.getTracks)();

// next :: MopidyApi -> Future Error ()
const next = mopidy =>
  futurize(mopidy.playback.next)();

// pause :: MopidyApi -> Future Error ()
const pause = mopidy =>
  futurize(mopidy.playback.pause)();

// play :: MopidyApi -> Future Error ()
const play = mopidy =>
  futurize(mopidy.playback.play)();

// search :: String -> MopidyApi -> Future Error [RpcSearchResult]
const search = R.curry((query, mopidy) =>
  futurize(mopidy.library.search)({any: query}));

module.exports = {
  addTrack: addTrack,
  getAlbumArt: getAlbumArt,
  getCurrentIndex: getCurrentIndex,
  getCurrentTrack: getCurrentTrack,
  getElapsed: getElapsed,
  getPlaybackState: getPlaybackState,
  getPlaylistTracks: getPlaylistTracks,
  next: next,
  pause: pause,
  play: play,
  search: search,
};
