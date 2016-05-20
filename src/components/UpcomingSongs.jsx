'use strict';

const R = require('ramda');
const React = require('react');

const propTypes = require('../constants/propTypes');
const PlaylistItem = require('./PlaylistItem');


(<style>
.upcoming-songs
  position: absolute
  width: 100%
  top: 6 * $list-item-height
  z-index: 0

  &__container
    box-shadow: 0 28px 65px rgba(0, 0, 0, 0.3)
    width: 100%
</style>)


const renderTrack = track => (
  <PlaylistItem artist={track.artist}
                duration={track.duration}
                title={track.title}/>
);

const UpcomingSongs = props => (
  <div className="upcoming-songs">
    <div className="upcoming-songs__container">
      {R.map(renderTrack, props.tracks)}
    </div>
  </div>
);

UpcomingSongs.propTypes = {
  tracks: React.PropTypes.arrayOf(propTypes.track).isRequired,
};

module.exports = UpcomingSongs;
