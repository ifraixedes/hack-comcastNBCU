// This files is required even though is empty otherwise gulp dev crashes

let heart = require('./heart');
let ui = require('./ui');
let geolocation = require('./api/geolocation');
let stringWire = require('./api/string-wire');

ui(heart.artery, heart.vein);
geolocation(heart.artery, heart.vein);
stringWire(heart.artery, heart.vein);
