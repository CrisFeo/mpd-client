'use strict';

const reactRedux = require('react-redux');

const api = require('../api');
const CurrentTrack = require('../components/CurrentTrack');


const mapStateToProps = state => ({
  currentTrack: state.currentTrack,
  elapsed: state.elapsed,
  isPlaying: state.playbackState === 'playing',
});

const mapDispatchToProps = dispatch => ({
  onClickPlayPause: () => dispatch(api.togglePlayback),
  onClickSkip: () => dispatch(api.nextTrack),
});

module.exports = reactRedux.connect(mapStateToProps,
                                    mapDispatchToProps)(CurrentTrack);
