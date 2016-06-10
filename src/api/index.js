'use strict';

const Mopidy = require('mopidy');

const orchestrators = require('./orchestrators');


// create :: String -> MopidyApi
//
// Creates an instance of the Mopidy api client connected to a websocket
// at the given origin.
const create = origin => new Mopidy({
  callingConvention: 'by-position-or-by-name',
  webSocketUrl: origin,
});

// start :: MopidyApi -> (Action -> ()) -> ()
//
// Sets up event listeners on the provided MopidyApi instance that dispatched
// ApiOrchestrators to the provided dispatch function.
const start = (mopidy, dispatch) => {
  mopidy.on('event:playbackStateChanged', () => dispatch(orchestrators.updatePlaybackState));
  mopidy.on('event:tracklistChanged',     () => dispatch(orchestrators.updatePlaylistTracks));
  mopidy.on('event:trackPlaybackStarted', () => dispatch(orchestrators.updateCurrent));
  mopidy.on('state:online',               () => dispatch(orchestrators.updateAll));
  setInterval(()=> dispatch(orchestrators.updateElapsed), 1000);
};

// Exported api queries are orchestrators that dispatch no resultant actions.
module.exports = {
  create: create,
  start: start,
  nextTrack: orchestrators.nextTrack,
  togglePlayback: orchestrators.togglePlayback,
};
