// This files is required even though is empty otherwise gulp dev crashes

let blood = require('./blood');
let ui = require('./ui');
let geolocation = require('./api/geolocation');
let stringWire = require('./api/string-wire');

ui(blood.artery);
geolocation(blood.artery);
stringWire(blood.artery, blood.vein);
