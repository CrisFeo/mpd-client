'use strict';

const React = require('react');


module.exports = () => <div>Now Playing</div>;

module.exports.propTypes = {
  artist: React.PropTypes.string.isRequired,
  elapsed: React.PropTypes.number.isRequired,
  length: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
};
