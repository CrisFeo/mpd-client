'use strict';

const React = require('react');


(<style>
.play-pause-button
  background: $color-button-bg
  border: 1px solid #9f9f9f
  border-radius: 50%
  color: #9f9f9f
  font-size: 1rem
  height: 70px
  text-align: center
  width: 70px

  &__play
    background-image: $icon-play
    background-position: 20px 12px
    background-repeat: no-repeat
    display: block;
    height: 100%
    width: 100%

  &__pause
    background-image: $icon-pause
    background-position: 20px 15px
    background-repeat: no-repeat
    display: block;
    height: 100%
    width: 100%
</style>)

const PlayPauseButton = props => (
  <div className="play-pause-button" onClick={props.onClick}>
    {props.isPlaying ? <i className="play-pause-button__pause"></i>
                     : <i className="play-pause-button__play"></i>}
  </div>
);

PlayPauseButton.propTypes = {
  isPlaying: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
};

module.exports = PlayPauseButton;
