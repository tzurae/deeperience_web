import bodyParser from 'body-parser';

export default {
  // parse application/x-www-form-urlencoded
  urlencoded: bodyParser.urlencoded({ extended: false }),
  // parse application/json
  json: bodyParser.json(),
};
