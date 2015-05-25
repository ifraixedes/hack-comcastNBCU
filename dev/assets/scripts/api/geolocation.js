'use strict';

module.exports = init;

// Events
const eventUpdate = 'update';

function init(artery, vein) {
  /*eslint-disable no-unused-vars */
  let watchID = null;
  /*eslint-enable no-unused-vars */
  let currentLocation = null;
  let geolocation = {
    start: startWatch,
    stop: stopWatch,
    get: function () {
      return currentLocation;
    }
  };

  if (!navigator.geolocation) {
    /*eslint-disable quotes */
    vein.emit('fatal', new Error("Browser doesn't support geolocation, this App cannot work"));
    /*eslint-enable quotes */
  }

  startWatch();
  return geolocation;

  function startWatch() {
    watchID = navigator.geolocation.watchPosition(getPosition, errorPosition, {
        timeout: 60000, // 1 minute
        maximumAge: 120000 // 2 minutes
    });
  }

  function stopWatch() {
    navigator.geolocation.clearWatch(watchID);
    watchID = null;
  }

  function getPosition(pos) {
    currentLocation = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    };
    vein.emit(`api:geolocation:${eventUpdate}`, geolocation);
  }

  function errorPosition() {
    vein.emit('error', new Error('Sorry no position available, try again or move around to get signal'));
  }
}
