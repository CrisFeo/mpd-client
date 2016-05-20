'use strict';

const request = require('browser-request');
const Promise = require('es6-promise').Promise;
const R = require('ramda');


// formatRpcBody :: (String, Params) -> RpcRequestBody
const formatRpcBody = (method, params) => ({
  method: 'POST',
  url: SERVER_ORIGIN + '/mopidy/rpc',
  json: { jsonrpc: '2.0', id: 1, method: method, params: params },
});

// parseRpcError :: RpcError -> ApiError
const parseRpcError = rpcError => R.pick(['message', 'type']);

// rpc :: String -> Params -> Promise RpcError RpcResponse
const rpc = R.curry((method, params) => new Promise((res, rej) =>
  request(formatRpcBody(method, params), (err, rsp, body) => {
		if (err != null) { return rej(err); }
		if (body.error != null) { return rej(parseRpcError(body.error)); }
		return res(body.result);
	})));

const addTrack = uri => rpc('core.tracklist.add', {uri: uri});

const getCurrentTrack = () => rpc('core.playback.get_current_track', []);

const getState = () => rpc('core.playback.get_state', []);

const getTracks = () => rpc('core.tracklist.get_tracks', []);

const pause = () => rpc('core.playback.pause', []);

const play = () => rpc('core.playback.play', []);

const search = query => rpc('core.library.search', [{any: query}]);

module.exports = {
  addTrack: addTrack,
  getCurrentTrack: getCurrentTrack,
  getState: getState,
  getTracks: getTracks,
  play: play,
  pause: pause,
  search: search,
};
