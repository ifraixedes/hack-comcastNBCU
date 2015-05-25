'use strict';

module.exports = init;
let streamListTpl = require('../../../views/streams-list.jade');

const vEventUpdate = 'update';

function init(artery, vein) {
  let listElem = document.querySelector('.container .streams-list');

  artery.on(`ui:streams-list:${vEventUpdate}`, regenerateList);

  // Functions definitions
  function regenerateList(streamsList) {
    listElem.innerHTML = streamListTpl({streams: streamsList});
  }
}
