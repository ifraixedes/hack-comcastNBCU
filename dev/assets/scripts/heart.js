'use strict';

let EventEmitter = require('events');

module.exports = {
  artery: new EventEmitter(),
  vein: new EventEmitter()
};

let artery = module.exports.artery;
let vein = module.exports.vein;

let state = {
  radius: 10,
  geo: null
};

artery.on('error', function (err) {
  console.log(err);
});

vein.on('error', function (err) {
  console.log(err);
});

// ui
vein.on('ui:radius:init', function (radius) {
  state.radius = radius.get();
});

vein.on('ui:radius:update', function (radius) {
  state.radius= radius.get();
  console.log(state.radius);
  artery.emit('api:string-wire:request:stream', {pos: state.geo.get(), radius: state.radius});
});

vein.on('api:geolocation:update', function (geo) {
  state.geo = geo;
  artery.emit('api:string-wire:request:stream', {pos: geo.get(), radius: state.radius});
});

vein.on('api:string-wire:response:ok', function (stringWire) {
  state.streams = stringWire.current();
  console.log(state);
  artery.emit('ui:streams-list:update', state.streams);
});

vein.on('api:string-wire:response:error', function (stringWire) {
  state.streams = stringWire.current();
});
