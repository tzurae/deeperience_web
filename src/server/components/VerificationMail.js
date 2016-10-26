import React, { PropTypes } from 'react';
import configs from '../../../configs/project/server';

let tokenToURL = (token) => (
  `${configs.host[process.env.NODE_ENV]}` +
  `/user/verification?token=${token}`
);

let VerfificationMail = ({ token }) => (
  <div>
    <p>
      Please click the following link to verify your account.
    </p>
    <p>
      <a href={tokenToURL(token)}>
        {tokenToURL(token)}
      </a>
    </p>
  </div>
);

VerfificationMail.propTypes = {
  token: PropTypes.string,
};

export default VerfificationMail;
