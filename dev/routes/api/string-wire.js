'use string';

export default StringWireRouter;
import {Router as router} from 'express';
import {expressAsyncWrapper as wrap} from '../../lib/util';
import {request} from '../../lib/http';
import dg from 'debug';

// API constants
const apiURL = 'https://api.stringwire.com/v3/streams';
const apiAuthValue = 'Bearer a6b67fa638b0e163d45daa3dbd931aff10f8715ba7d7105eada48c94ffa4650eb19e08a899913d24';
const queryLimit = '20';

function StringWireRouter(config) {
  let debug = dg(`${config.get('debug').namespace}:route:api:string-wire`);
  let stwRouter = router();

  stwRouter.get('/', wrap(async function (req, res) {
    console.log(req.query);
    debug('get request');

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
      pos: req.query.pos,
      radius: req.query.radius
    });

    res.json(response);
  }));

  return stwRouter;
}

function getStreams({position: pos, radius: radius, offset: offset}) {
  if (isNaN(offset)) {
    offset = 0;
  }

  reqwest({
    url: `${apiURL}?`
    + encodeURI(`limit=${queryLimit}&offset=${offset}&`)
    + encodeURIComponent(`geocode=${pos.lat},${pos.lon},${radius}km`),
    headers: {
      'Authorization': apiAuthValue
    }
  }).then(function (resp) {
    if (resp.StatusCode >= 200) {
    } else {
    }
  }).catch(function (err) {
  });
}
