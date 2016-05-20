'use strict';

const React = require('react');

module.exports = {
  track: React.PropTypes.shape({
   artist: React.PropTypes.string.isRequired,
   albumImage: React.PropTypes.string.isRequired,
   duration: React.PropTypes.number.isRequired,
   title: React.PropTypes.string.isRequired,
  }),
};
