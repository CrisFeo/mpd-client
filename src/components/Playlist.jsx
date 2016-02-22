'use strict';

const React = require('react');


(<style>
.playlist
  background-color: chartreuse
</style>);

module.exports = () => <div>Playlist</div>;

module.exports.propTypes = {
  onMoveSong: React.PropTypes.func.isRequired,
  onRemoveSong: React.PropTypes.func.isRequired,
  songs: React.PropTypes.array.isRequired,
};
