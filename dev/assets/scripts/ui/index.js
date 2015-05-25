'use strict';

module.exports = init;

let radius = require('./radius');
let streamsList = require('./streams-list');

function init(artery, vein) {
  radius(artery, vein);
  streamsList(artery, vein);
}
