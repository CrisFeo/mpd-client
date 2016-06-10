'use strict';

const Future = require('fluture');
const futurize = require('futurize').futurizeP(Future);
const Mopidy = require('mopidy');
const R = require('ramda');
const S = require('sanctuary');

const actionTypes = require('../constants/actionTypes');


// Rpc parsers
////////////////////////

// parseTrack :: RpcTrackResult -> Either Error Track
const parseTrack = R.tryCatch(rpcTrack => S.Right({
  artist: R.path(['artists', '0', 'name'], rpcTrack),
  albumImage: 'http://placehold.it/300',
  duration: rpcTrack.length,
  index: 0,
  title: rpcTrack.name,
  uri: rpcTrack.uri,
}), S.Left);

// parsePlaylistTracks :: [RpcTrackResult] -> Either Error [Track]
const parsePlaylistTracks = S.pipe([
  R.map(parseTrack),
  R.addIndex(R.map)((eitherTrack, idx) =>
                    R.map(R.assoc('index', idx), eitherTrack)),
  R.sequence(S.Right),
]);


// Action creators
////////////////////////

// formatCurrentIndex :: Int -> Action
const formatCurrentIndex = index => ({
  type: actionTypes.UPDATE_CURRENT_INDEX,
  value: index,
});

// formatCurrentTrack :: RpcTrackResult -> Action
const formatCurrentTrack = track => ({
  type: actionTypes.UPDATE_CURRENT_TRACK,
  value: track,
});

// formatElapsed :: Int -> Action
const formatElapsed = elapsed => ({
  type: actionTypes.UPDATE_ELAPSED,
  value: elapsed,
});

// formatPlaybackState :: String -> Action
const formatPlaybackState = playbackState => ({
  type: actionTypes.UPDATE_PLAYBACK_STATE,
  value: playbackState,
});

// formatPlaylistTracks :: [RpcTrackResult] -> Action
const formatPlaylistTracks = tracks => ({
  type: actionTypes.UPDATE_PLAYLIST_TRACKS,
  value: tracks,
});


// Mopidy api futurization
////////////////////////

const queryCurrentIndex = mopidy => futurize(mopidy.tracklist.index)();
const queryCurrentTrack = mopidy => futurize(mopidy.playback.getCurrentTrack)();
const queryElapsed = mopidy => futurize(mopidy.playback.getTimePosition)();
const queryPlaybackState = mopidy => futurize(mopidy.playback.getState)();
const queryPlaylistTracks = mopidy => futurize(mopidy.tracklist.getTracks)();


// Query/dispatch orchestration
//
// ActionOrchestrator :: MopidyApi -> Future Error [Action]
////////////////////////

// updateCurrentIndex :: ActionOrchestrator
const updateCurrentIndex = S.pipe([
  queryCurrentIndex,
  R.map(formatCurrentIndex),
  R.map(R.of),
]);

// updateCurrentTrack :: ActionOrchestrator
const updateCurrentTrack = S.pipe([
  queryCurrentTrack,
  R.map(parseTrack),
  R.chain(S.either(Future.reject, Future.of)),
  R.map(formatCurrentTrack),
  R.map(R.of),
]);

// updateElapsed :: ActionOrchestrator
const updateElapsed = S.pipe([
  queryElapsed,
  R.map(formatElapsed),
  R.map(R.of),
]);

// updatePlaybackState :: ActionOrchestrator
const updatePlaybackState = S.pipe([
  queryPlaybackState,
  R.map(formatPlaybackState),
  R.map(R.of),
]);

// updatePlaylistTracks :: ActionOrchestrator
const updatePlaylistTracks = S.pipe([
  queryPlaylistTracks,
  R.map(parsePlaylistTracks),
  R.chain(S.either(Future.reject, Future.of)),
  R.map(formatPlaylistTracks),
  R.map(R.of),
]);

// updateAll :: ActionOrchestrator
const updateAll = mopidy => Future.parallel(Infinity, [
  updateCurrentIndex(mopidy),
  updateCurrentTrack(mopidy),
  updateElapsed(mopidy),
  updatePlaybackState(mopidy),
  updatePlaylistTracks(mopidy),
]).map(R.unnest);

// updateCurrent :: ActionOrchestrator
const updateCurrent = mopidy => Future.parallel(Infinity, [
  updateCurrentIndex(mopidy),
  updateCurrentTrack(mopidy),
]).map(R.unnest);

// initialize :: String -> (Action -> ()) -> MopidyClient
//
// Initializes an instance of the Mopidy api client connected to a websocket
// at the given origin. Hooks up the provided dispatch function to necessary
// events.
const initialize = (origin, dispatch) => {
  const mopidy = new Mopidy({
    callingConvention: 'by-position-or-by-name',
    webSocketUrl: origin,
  });
  const executor = f => () => f(mopidy).fork(err => console.error(err),
                                             R.map(dispatch));
  mopidy.on('event:playbackStateChanged', executor(updatePlaybackState));
  mopidy.on('event:tracklistChanged',     executor(updatePlaylistTracks));
  mopidy.on('event:trackPlaybackStarted', executor(updateCurrent));
  mopidy.on('state:online',               executor(updateAll));
  setInterval(executor(updateElapsed), 1000);
  return mopidy;
};


module.exports = {
  initialize: initialize,
};
