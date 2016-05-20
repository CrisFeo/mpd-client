'use strict';

const React = require('react');

module.exports = {
  track: React.PropTypes.shape({
   artist: React.PropTypes.string.isRequired,
   albumImage: React.PropTypes.string.isRequired,
   duration: React.PropTypes.number.isRequired,
   id: React.PropTypes.string.isRequired,
   title: React.PropTypes.string.isRequired,
  }),
};
