'use strict';

const R = require('ramda');
const S = require('sanctuary');


// parseAlbumImage :: RpcAlbumImageResult -> Either Error String
const parseAlbumImage = S.pipe([
  S.encase(S.values),
  R.chain(S.head),
  R.chain(S.head),
  R.chain(S.get(String, 'uri')),
  S.maybeToEither(new Error('error parsing album image')),
]);

// parseTrack :: RpcTrackResult -> Either Error Track
const parseTrack = R.tryCatch(rpcTrack => S.Right({
  artist: R.path(['artists', '0', 'name'], rpcTrack),
  albumImage: '',
  duration: rpcTrack.length,
  index: 0,
  title: rpcTrack.name,
  uri: rpcTrack.uri,
}), S.Left);

// parsePlaylistTracks :: [RpcTrackResult] -> Either Error [Track]
const parsePlaylistTracks = S.pipe([
  R.map(parseTrack),
  R.addIndex(R.map)((eitherTrack, idx) =>
                    R.map(R.assoc('index', idx), eitherTrack)),
  R.sequence(S.Right),
]);

module.exports = {
  albumImage: parseAlbumImage,
  track: parseTrack,
  playlistTracks: parsePlaylistTracks,
};
