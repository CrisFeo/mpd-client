'use strict';

const actionTypes = require('../constants/actionTypes');


// updateCurrentIndex :: Int -> Action
const updateCurrentIndex = index => ({
  type: actionTypes.UPDATE_CURRENT_INDEX,
  value: index,
});

// updateCurrentTrack :: RpcTrackResult -> Action
const updateCurrentTrack = track => ({
  type: actionTypes.UPDATE_CURRENT_TRACK,
  value: track,
});

// updateElapsed :: Int -> Action
const updateElapsed = elapsed => ({
  type: actionTypes.UPDATE_ELAPSED,
  value: elapsed,
});

// updatePlaybackState :: String -> Action
const updatePlaybackState = playbackState => ({
  type: actionTypes.UPDATE_PLAYBACK_STATE,
  value: playbackState,
});

// updatePlaylistTracks :: [RpcTrackResult] -> Action
const updatePlaylistTracks = tracks => ({
  type: actionTypes.UPDATE_PLAYLIST_TRACKS,
  value: tracks,
});

module.exports = {
  updateCurrentIndex: updateCurrentIndex,
  updateCurrentTrack: updateCurrentTrack,
  updateElapsed: updateElapsed,
  updatePlaybackState: updatePlaybackState,
  updatePlaylistTracks: updatePlaylistTracks,
};
