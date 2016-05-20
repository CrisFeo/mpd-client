'use strict';

const reactRedux = require('react-redux');

const actions = require('../actions');
const CurrentTrack = require('../components/CurrentTrack');


const mapStateToProps = state => ({
  currentTrack: state.currentTrack,
  elapsed: state.elapsed,
  isPlaying: state.playbackState === 'playing',
});

const mapDispatchToProps = dispatch => ({
  onClickPlayPause: () => dispatch(actions.togglePlayback()),
  onClickSkip: () => dispatch(actions.skipTrack()),
});

module.exports = reactRedux.connect(mapStateToProps,
                                    mapDispatchToProps)(CurrentTrack);
