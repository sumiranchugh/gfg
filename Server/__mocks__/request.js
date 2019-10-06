import {data} from './sampleData'
const request = {};
function get(options, callback) {
  if (options.json.query.match_all) {
    return Promise.resolve(callback(null, { statusCode: 200 }, { hits: 0 }));
  } if (options.json.query.fail) {
    return Promise.resolve(callback(null, { statusCode: 400 }, { hits: 0 }));
  }
  return Promise.resolve(
    callback(
      null,
      { statusCode: 200 },
      data
    )
  );
}

request.get = get;

export default request;
