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

  pickerElem.addEventListener('change', pickerElemOnChange);
  pickerElem.addEventListener('input', pickerElemOnInput);

  vein.emit(`ui:radius:${eventInit}`, radius);
  return radius;

  // Functions definitions
  function pickerElemOnChange(event) {
    vein.emit(`ui:radius:${eventUpdate}`, radius);
  }

  function pickerElemOnInput(event) {
    showValueElem.innerHTML = event.target.value;
  }

  function getCurrentValue() {
    return parseFloat(pickerElem.value);
  }
}
