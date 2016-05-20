'use strict';

const R = require('ramda');
const React = require('react');

const propTypes = require('../constants/propTypes');
const PlaylistItem = require('./PlaylistItem');


(<style>
.played-songs
  height: 3 * $list-item-height
  position: absolute
  width: 100%
  z-index: 0

  &__container
    bottom: 0
    box-shadow: 0 28px 65px rgba(0, 0, 0, 0.3)
    position: absolute
    width: 100%
</style>)

const renderTrack = track => (
  <PlaylistItem key={track.id}
                artist={track.artist}
                duration={track.duration}
                title={track.title}/>
);

const PlayedSongs = props => (
  <div className="played-songs">
    <div className="played-songs__container">
      {R.map(renderTrack, props.tracks)}
    </div>
  </div>
);

PlayedSongs.propTypes = {
  tracks: React.PropTypes.arrayOf(propTypes.track).isRequired,
};

module.exports = PlayedSongs;
