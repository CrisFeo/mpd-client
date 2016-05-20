'use strict';

const React = require('react');

const utils = require('./utilities');


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

const TrackControls = props => (
  <div className="track-controls">
    <div className="track-controls__elapsed">
      {utils.formatTime(props.elapsed)} / {utils.formatTime(props.duration)}
    </div>
    <div className="track-controls__vote-skip"
         onClick={props.onClickSkip} ></div>
  </div>
);

TrackControls.propTypes = {
  duration: React.PropTypes.number.isRequired,
  elapsed: React.PropTypes.number.isRequired,
  onClickSkip: React.PropTypes.func.isRequired,
};

module.exports = TrackControls;
