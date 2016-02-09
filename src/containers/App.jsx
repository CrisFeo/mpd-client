'use strict';

const R = require('ramda');
const React = require('react');
const reactRedux = require('react-redux');

const actions = require('../actions');
const NowPlaying = require('../components/NowPlaying');
const PlaybackControls = require('../components/PlaybackControls');
const Playlist = require('../components/Playlist');
const SearchBar = require('../components/SearchBar');
const SearchResults = require('../components/SearchResults');


const App = props => (
  <div>
    <NowPlaying artist={props.currentTrack.artist}
                elapsed={props.currentTrack.elapsed}
                length={props.currentTrack.length}
                title={props.currentTrack.title}/>
    <PlaybackControls isPlaying={props.isPlaying}
                      onSeekBack={() => props.dispatch(actions.playback.seekBack())}
                      onSeekForward={() => props.dispatch(actions.playback.seekForeward())}
                      onTogglePlay={() => props.dispatch(actions.playback.toggle(props.isPlaying))}/>
    <SearchBar onBlur={() => props.dispatch(actions.search.blur())}
               onChange={query => props.dispatch(actions.search.change(query))}
               onFocus={() => props.dispatch(actions.search.focus())}
               query={props.searchQuery}/>
    {renderSongList(props)}
  </div>
);

const renderSongList = props => {
  if (props.isSearching) {
    return (<SearchResults onSelect={id => props.dispatch(actions.search.select(id))}
                           results={props.searchResults}/>);
  } else {
    return (<Playlist onMoveSong={(id, index) => props.dispatch(actions.playlist.moveSong(id, index))}
                      onRemoveSong={id => props.dispatch(actions.playlist.removeSong(id))}
                      songs={props.playlist}/>);
  }
};

App.propTypes = {
  currentTrack:  React.PropTypes.object.isRequired,
  dispatch:      React.PropTypes.func.isRequired,
  isPlaying:     React.PropTypes.bool.isRequired,
  isSearching:   React.PropTypes.bool.isRequired,
  playlist:      React.PropTypes.array.isRequired,
  searchResults: React.PropTypes.array.isRequired,
  searchQuery:   React.PropTypes.string.isRequired,
};

module.exports = reactRedux.connect(R.identity)(App);
