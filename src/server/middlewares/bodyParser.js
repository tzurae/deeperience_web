import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { handleJwtError } from '../decorators/handleError';

export default {
  // parse application/x-www-form-urlencoded
  urlencoded: bodyParser.urlencoded({ extended: false }),
  // parse application/json
  json: bodyParser.json(),
  jwt: (key, secret) => (req, res, next) => {
    let token = req.body[key];

    jwt.verify(token, secret, handleJwtError(res)((decoded) => {
      req.decodedPayload = decoded;
      next();
    }));
  },
};
