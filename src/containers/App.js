'use strict';

const reactRedux = require('react-redux');

const App = require('../components/App');
const selectors = require('../reducers/selectors');


const mapStateToProps = state => ({
  playedTracks: selectors.playedTracks(state),
  upcomingTracks: selectors.upcomingTracks(state),
});

const mapDispatchToProps = dispatch => ({});

module.exports = reactRedux.connect(mapStateToProps,
                                    mapDispatchToProps)(App);
