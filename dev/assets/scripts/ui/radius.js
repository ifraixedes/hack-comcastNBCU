'use strict';

module.exports = init;

const eventInit = 'init';
const eventUpdate = 'update';

function init(artery, vein) {
  let showValueElem = document.querySelector('.container [name="radiusValue"]');
  let pickerElem = document.querySelector('.container [name="radiusPicker"]');
  let radius = {
    get: getCurrentValue
  };

  pickerElem.addEventListener('input', pickerElemOnInput);

  vein.emit(`ui:radius:${eventInit}`, radius);
  return radius;

  // Functions definitions
  function pickerElemOnInput(event) {
    showValueElem.innerHTML = event.target.value;
    vein.emit(`ui:radius:${eventUpdate}`, radius);
  }

  function getCurrentValue() {
    return parseFloat(pickerElem.getAttribute('value'));
  }
}
