'use strict';

const React = require('react');


module.exports = () => <div>Playlist</div>;

module.exports.propTypes = {
  onMoveSong: React.PropTypes.func.isRequired,
  onRemoveSong: React.PropTypes.func.isRequired,
  songs: React.PropTypes.array.isRequired,
};
