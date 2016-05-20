'use strict';

const React = require('react');

const CurrentTrack = require('../containers/CurrentTrack');
const PlayedSongs = require('./PlayedSongs');
const propTypes = require('../constants/propTypes');
const UpcomingSongs = require('./UpcomingSongs');


(<style>
.app
  left: 50%
  position: absolute
  transform: translateX(-50%)
  width: $application-width
</style>)

const App = props => (
  <div className="app">
    <PlayedSongs tracks={props.playedTracks} />
    <CurrentTrack />
    <UpcomingSongs tracks={props.upcomingTracks} />
  </div>
);

App.propTypes = {
  playedTracks: React.PropTypes.arrayOf(propTypes.track).isRequired,
  upcomingTracks: React.PropTypes.arrayOf(propTypes.track).isRequired,
};

module.exports = App;
