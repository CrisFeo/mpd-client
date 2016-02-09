'use strict';

const React = require('react');


module.exports = props => <div>Search Bar</div>;

module.exports.propTypes = {
  onBlur: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func.isRequired,
  query: React.PropTypes.string.isRequired,
};
