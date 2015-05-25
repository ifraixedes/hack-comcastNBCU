'use strict';

module.exports = init;

let http = require('reqwest');
let qs = require('qs');

// Events
const aStreamRespOK = 'response:ok';
const vStreamGet = 'request:stream';

function init(artery, vein) {
  let currentResult = null;
  let errorResult = null;
  let stringWire = {
    update: getStreams,
    current: function () {
      return currentResult;
    },
    error: function () {
      let e = errorResult;
      errorResult = null;
      return e;
    }
  };

  artery.on(`api:string-wire:${vStreamGet}`, getStreams);

  return stringWire;

  function getStreams(params) {
    if (isNaN(params.offset)) {
      params.offset = 0;
    }

    http({
      url: '/api/stringwire?' + qs.stringify(params)
    }).then(function (resp) {
          currentResult = resp;
          vein.emit(`api:string-wire:${aStreamRespOK}`, stringWire);
    }).catch(function (err) {
      vein.emit('error', err);
    });
  }
}
