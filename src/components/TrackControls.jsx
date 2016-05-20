'use strict';

const React = require('react');
const R = require('ramda');
const S = require('sanctuary');


(<style>
.track-controls
  align-items: center
  display: flex
  flex-direction: column
  height: 100%
  justify-content: space-around
  padding: $current-track-padding

  &__elapsed
    font-size: 1rem

  &__vote-skip
    background: $color-button-bg
    background-image: $icon-skip
    background-position: 6px
    background-size: 30px
    background-repeat: no-repeat
    border: 1px solid #9f9f9f
    border-radius: 3px
    color: #9f9f9f
    font-size: 1rem
    height: 45px
    text-align: center
    width: 45px
    vertical-align: middle
</style>);

const zeroPad = num => R.drop(num.length, '00') + num;

const formatTime = s => {
  const hours   = R.toString(Math.floor(s / 3600));
  const minutes = R.toString(Math.floor(s / 60));
  const seconds = R.toString(s % 60);
  return hours === '0' ? R.join(':', [minutes, zeroPad(seconds)])
                       : R.join(':', [hours, zeroPad(minutes), zeroPad(seconds)]);
}

const TrackControls = props => (
  <div className="track-controls">
    <div className="track-controls__elapsed">
      {formatTime(props.elapsed)} / {formatTime(props.duration)}
    </div>
    <div className="track-controls__vote-skip"></div>
  </div>
);

TrackControls.propTypes = {
  duration: React.PropTypes.number.isRequired,
  elapsed: React.PropTypes.number.isRequired,
};

module.exports = TrackControls;
