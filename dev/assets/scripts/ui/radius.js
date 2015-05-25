'use strict';

module.exports = init;

const eventInit = 'init';
const eventUpdate = 'update';

function init(artery) {
  let showValueElem = document.querySelector('.container [name="radiusValue"]');
  let pickerElem = document.querySelector('.container [name="radiusPicker"]');
  let radius = {
    get: getCurrentValue
  };

  pickerElem.addEventListener('input', pickerElemOnInput);

  artery.emit(`ui:radius:${eventInit}`, radius);
  return radius;

  // Functions definitions
  function pickerElemOnInput(event) {
    showValueElem.innerHTML = event.target.value;
    artery.emit(`ui:radius:${eventUpdate}`, radius);
  }

  function getCurrentValue() {
    return parseFloat(pickerElem.getAttribute('value'));
  }
}
