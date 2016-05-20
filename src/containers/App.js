'use strict';

const reactRedux = require('react-redux');

const App = require('../components/App');


const mapStateToProps = state => ({
  playedTracks: state.playedTracks,
  upcomingTracks: state.upcomingTracks,
});

const mapDispatchToProps = dispatch => ({});

module.exports = reactRedux.connect(mapStateToProps,
                                    mapDispatchToProps)(App);
