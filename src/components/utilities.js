'use strict';

const R = require('ramda');
const S = require('sanctuary');


const zeroPad = num => R.drop(num.length, '00') + num;

const formatTime = ms => {
  const hours   = R.toString(Math.floor(ms / 3600000));
  const minutes = R.toString(Math.floor(ms / 60000) % 60);
  const seconds = R.toString(Math.floor(ms / 1000) % 60);
  return hours === '0' ? R.join(':', [minutes, zeroPad(seconds)])
                       : R.join(':', [hours, zeroPad(minutes), zeroPad(seconds)]);
}


module.exports = {
  formatTime: formatTime,
}
