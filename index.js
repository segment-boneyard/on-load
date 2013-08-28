
var callback = require('callback');


/**
 * Loaded state.
 */

var loaded = false;


/**
 * Callbacks.
 */

var callbacks = [];


/**
 * Expose `onLoad`.
 */

module.exports = onLoad;


/**
 * Call a `fn` on `window.load`.
 *
 * @param {Function} fn
 */

function onLoad (fn) {
  loaded
    ? callback.async(fn)
    : callbacks.push(fn);
}


/**
 * Bind to `window.onload`.
 */

var old = window.onload;
window.onload = function () {
  var fn, loaded = true;
  callback(old);
  while(fn = callbacks.shift()) callback(fn);
};