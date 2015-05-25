'use strict';

module.exports = init;

let http = require('reqwest');
let qs = require('qs');

// Events
const aStreamRespOK = 'response:ok';
const aStreamRespError = 'response:error';
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

  vein.on(`api:string-wire:${vStreamGet}`, getStreams);

  return stringWire;

  function getStreams(params) {
    if (isNaN(params.offset)) {
      params.offset = 0;
    }

    http({
      url: '/api/stringwire?' + qs.stringify(params),
    }).then(function (resp) {
        if (resp.StatusCode >= 200) {
          currentResult = JSON.parse(resp.content);
          artery.emit(`api:string-wire:${aStreamRespOK}`, stringWire);
        } else {
          errorResult = resp;
          artery.emit(`api:string-wire:${aStreamRespError}`, stringWire);
        }
    }).catch(function (err) {
      artery.emit('error', err);
    });
  }
}
