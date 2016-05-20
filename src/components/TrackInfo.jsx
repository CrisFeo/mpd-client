'use strict';

const React = require('react');


(<style>
.track-info
  flex-grow: 1
  height: 100%
  padding: $current-track-padding
  padding-left: 20px

  &__title
    font-size: 1.2rem
    padding-top: 20px

  &__artist
    font-size: 1rem
    padding-top: 10px
</style>);

const TrackInfo = props => (
  <div className="track-info">
    <div className="track-info__title">{props.title}</div>
    <div className="track-info__artist">{props.artist}</div>
  </div>
);

TrackInfo.propTypes = {
  artist: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

module.exports = TrackInfo;
