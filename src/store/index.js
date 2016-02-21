'use strict';

const redux = require('redux');

const reducers = require('../reducers');


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
