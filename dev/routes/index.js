'use strict';

export default routes;

import stringWire from './api/string-wire';

function routes(config) {
  return {
    '': require('./home')(config),
    'api/stringwire': stringWire(config)
  };
}
