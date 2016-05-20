'use strict';

const React = require('react');


(<style>
.playlist-item
  background: $color-list-item-bg;
  height: $list-item-height;
  width: 100%;

  &:nth-of-type(odd)
    background: darken($color-list-item-bg, 5%);
</style>)

const PlaylistItem = props => (
  <div className="playlist-item">
    {props.title} - {props.artist} ({props.duration})
  </div>
);

PlaylistItem.propTypes = {
  artist: React.PropTypes.string.isRequired,
  duration: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
};

module.exports = PlaylistItem;
