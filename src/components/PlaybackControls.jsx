'use strict';

const React = require('react');


module.exports = () => <div>Playback Controls</div>;

module.exports.propTypes = {
  isPlaying: React.PropTypes.bool.isRequired,
  onSeekBack: React.PropTypes.func.isRequired,
  onSeekForward: React.PropTypes.func.isRequired,
  onTogglePlay: React.PropTypes.func.isRequired,
};
