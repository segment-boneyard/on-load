
var tick = require('next-tick');


/**
 * Expose `onLoad`.
 */

module.exports = onLoad;


/**
 * Cache.
 */

var loaded, context, args;


/**
 * Callbacks.
 */

var callbacks = [];


/**
 * Preserve existing `onload`.
 */

if ('function' == typeof window.onload) callbacks.push(window.onload);


/**
 * Bind to `window.onload`.
 */

window.onload = function () {
  loaded = true;
  context = this;
  args = arguments;
  for (var i = 0, fn; fn = callbacks[i]; i++) fn.apply(context, args);
};


/**
 * Call a `fn` on `window.load`.
 *
 * @param {Function} fn
 */

function onLoad (fn) {
  if ('function' != typeof fn) return;
  loaded
    ? tick(function () { fn.apply(context, args); })
    : callbacks.push(fn);
}