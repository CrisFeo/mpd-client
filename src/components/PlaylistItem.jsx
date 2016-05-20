'use strict';

const React = require('react');

const utils = require('./utilities');


(<style>
.playlist-item
  align-items: center
  background: $color-list-item-bg
  display: flex
  height: $list-item-height
  width: 100%;

  &:nth-of-type(odd)
    background: darken($color-list-item-bg, 5%)

  &__song
    padding-left: 5px

  &__title
    color: #333340
    font-size: 1.05rem

  &__artist
    color: #888890
    font-size: 1rem
    padding-left: 10px

  &__duration
    color: #888890
    flex-grow: 1
    font-size: 1rem
    padding-right: 5px
    text-align: right
</style>)

const PlaylistItem = props => (
  <div className="playlist-item">
    <div className="playlist-item__song">
      <span className="playlist-item__title">{props.title}</span>
      <span className="playlist-item__artist">{props.artist}</span>
    </div>
    <div className="playlist-item__duration">
      {utils.formatTime(props.duration)}
    </div>
  </div>
);

PlaylistItem.propTypes = {
  artist: React.PropTypes.string.isRequired,
  duration: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
};

module.exports = PlaylistItem;
