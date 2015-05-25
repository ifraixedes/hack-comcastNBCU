'use string';

export default StringWireRouter;
import {Router as router} from 'express';
import {expressAsyncWrapper as wrap} from '../../lib/util';
import {request} from '../../lib/http';
import dg from 'debug';

// API constants
const apiAuthValue = 'Bearer a6b67fa638b0e163d45daa3dbd931aff10f8715ba7d7105eada48c94ffa4650eb19e08a899913d24';
const queryLimit = '20';

function StringWireRouter(config) {
  let debug = dg(`${config.get('debug').namespace}:route:api:string-wire`);
  let stwRouter = router();

  stwRouter.get('/', wrap(async function (req, res) {
    console.log(req.query);
    debug('get request');

    let pos = req.query.pos;
    let radius = req.query.radius;

    try {
      let response = await request({
        host: 'api.stringwire.com',
        scheme: 'https',
        path: '/v2/streams',
        headers: {
          'Authorization': apiAuthValue
        }
      }, {
        offset: req.query.offset,
        limit: req.query.limit || queryLimit,
        geocode: `${pos.lat},${pos.lon},${radius}km`
      });

      res.json(response);
    } catch (e) {
      console.log(e);
      res.json([]);
    }
  }));

  return stwRouter;
}
