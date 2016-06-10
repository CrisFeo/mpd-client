'use strict';

const React = require('react');


(<style>
.track-art
  display: flex
  height: 100%
  padding: $current-track-padding
  width: 3 * $list-item-height

  &__img
    align-self: center
    background: #CCCCCC
    max-height: 100%
    max-width: 100%
</style>);

const TrackArt = props => (
<div className="track-art">
  <img className="track-art__img" src={props.imageUrl}/>
</div>
);

TrackArt.propTypes = {
  imageUrl: React.PropTypes.string.isRequired,
};

module.exports = TrackArt;
