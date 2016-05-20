'use strict';

const Promise = require('es6-promise').Promise;
const R = require('ramda');
const S = require('sanctuary');


const MPD_SERVER_ORIGIN = 'http://localhost:6680';


// request :: (String, Object) -> Promise RequestError Object
const request = (url, body) => new Promise((res, rej) => {
  let xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    xhr.open('POST', url, true);
  } else if (typeof XDomainRequest != "undefined") {
    xhr = new XDomainRequest();
    xhr.open('POST', url);
  } else {
    rej();
  }
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.withCredentials = true;
  xhr.onerror = () => rej('REQUEST_ERROR');
  xhr.onload = R.tryCatch(() => res(JSON.parse(xhr.responseText)), rej);
  xhr.ontimeout = () => rej('REQUEST_TIMEOUT');
  R.tryCatch(() => xhr.send(JSON.stringify(body)), rej)();
});

// formatRpcBody :: (String, Params) -> RpcRequestBody
const formatRpcBody = (method, params) => ({
  jsonrpc: '2.0',
  id: 1,
  method: method,
  params: params,
});

// parseRpcError :: RpcError -> ApiError
const parseRpcError = rpcError => R.pick(['message', 'type']);

// rpc :: String -> Params -> Promise RpcError RpcResponse
const rpc = R.curry((method, params) => new Promise((res, rej) =>
  request(MPD_SERVER_ORIGIN + '/mopidy/rpc', formatRpcBody(method, params))
  .then(body => body.error != null ? rej(parseRpcError(body.error)) : res(body.result),
        err => rej(err))));

// parseTrack :: RpcTrackResult -> Maybe Track
const parseTrack = R.tryCatch(rpcTrack => S.Just({
  artist: R.path(['artists', '0', 'name'], rpcTrack),
  albumImage: 'http://placehold.it/1000',
  duration: rpcTrack.length,
  id: rpcTrack.uri,
  title: rpcTrack.name,
}), S.Nothing);

// parseSearchResults :: RpcSearchResults -> Maybe [Track]
const extractSearchResults = S.pipe([
  S.head,
  R.chain(S.get(Array, 'tracks')),
  R.map(S.mapMaybe(parseTrack))
]);

// throwInvalidParse :: String -> Maybe a -> a
const throwInvalidParse = endpoint => maybe => {
  if (maybe.isJust) {
    return maybe.value;
  } else {
    console.error('Parse error in ' + endpoint, maybe);
    throw new Error('Parse error');
  }
};

const addTrack = uri => rpc('core.tracklist.add', {uri: uri});

const getCurrentIndex = () => rpc('core.tracklist.index', []);

const getCurrentTrack = () => rpc('core.playback.get_current_track', [])
                              .then(parseTrack)
                              .then(throwInvalidParse('mpd.getCurrentTrack'));

const getElapsed = () => rpc('core.playback.get_time_position', [])

const getPlaybackState = () => rpc('core.playback.get_state', []);

const getTracks = () => rpc('core.tracklist.get_tracks', [])
                        .then(rpcTracks => R.sequence(S.Maybe.of, R.map(parseTrack, rpcTracks)))
                        .then(throwInvalidParse('mpd.getTracks'));

const nextTrack = () => rpc('core.playback.next', []);

const pause = () => rpc('core.playback.pause', []);

const play = () => rpc('core.playback.play', []);

const search = query => rpc('core.library.search', [{any: query}])
                        .then(extractSearchResults)
                        .then(throwInvalidParse('mpd.search'));

module.exports = {
  addTrack: addTrack,
  getCurrentIndex: getCurrentIndex,
  getCurrentTrack: getCurrentTrack,
  getElapsed: getElapsed,
  getPlaybackState: getPlaybackState,
  getTracks: getTracks,
  nextTrack: nextTrack,
  play: play,
  pause: pause,
  search: search,
};
