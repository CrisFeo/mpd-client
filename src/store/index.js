'use strict';

const redux = require('redux');

const reducers = require('../reducers');


const NEW_INITIAL_STATE = {
  nowPlaying: {
    elapsed: 0.0,       // Number
    isPlaying: false,   // Bool
    currentTrack: {     // Track
      artist: '',       // String
      length: 0.0,      // Number
      title: '',        // String
    },
  },
  search: {
    isSearching: false, // Bool
    results: [],        // Track
    query: '',          // String
  },
};

const INITIAL_STATE = {
  currentTrack: {     // Track
    artist: '',       // String
    elapsed: 0.0,     // Number
    length: 0.0,      // Number
    title: '',        // String
  },
  isPlaying: false,   // Bool
  isSearching: false, // Bool
  playlist: [],       // Array Tracks
  searchResults: [],  // Array Tracks
  searchQuery: '',    // Bool
};

module.exports = () => redux.createStore(reducers, INITIAL_STATE);
