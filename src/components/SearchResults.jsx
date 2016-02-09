'use strict';

const React = require('react');


module.exports = props => <div>Search Results</div>;

module.exports.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  songs: React.PropTypes.array.isRequired,
};
