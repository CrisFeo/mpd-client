'use strict';

const React = require('react');

const propTypes = require('../constants/propTypes');
const PlayPauseButton = require('./PlayPauseButton');
const TrackArt = require('./TrackArt');
const TrackControls = require('./TrackControls');
const TrackInfo = require('./TrackInfo');


(<style>
.current-track
  background: $color-current-track-bg
  box-shadow: 0 13px 60px rgba(0, 0, 0, 0.3)
  height: 3 * $list-item-height
  position: absolute
  top: 3 * $list-item-height
  transform: translateX(-$current-track-additional-width)
  width: $application-width + 2 * $current-track-additional-width
  z-index: 1

  &__floating-button
    position: absolute
    bottom: -0.5 * $list-item-height
    left: 2 * $list-item-height

  &__container
    display: flex
    height: 100%
</style>)

const CurrentTrack = props => (
  <div className="current-track">
    <div className="current-track__floating-button">
      <PlayPauseButton isPlaying={props.isPlaying}
                       onClick={props.onClickPlayPause} />
    </div>
    <div className="current-track__container">
      <TrackArt imageUrl={props.currentTrack.albumImage} />
      <TrackInfo artist={props.currentTrack.artist}
                 title={props.currentTrack.title} />
      <TrackControls duration={props.currentTrack.duration}
                     elapsed={props.elapsed} />
    </div>
  </div>
);

CurrentTrack.propTypes = {
  currentTrack: propTypes.track,
  elapsed: React.PropTypes.number.isRequired,
  isPlaying: React.PropTypes.bool.isRequired,
  onClickPlayPause: React.PropTypes.func.isRequired,
};

module.exports = CurrentTrack;
