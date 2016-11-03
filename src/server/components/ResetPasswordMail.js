import React, { PropTypes } from 'react';
import tokenToURL from '../utils/tokenToURL';

let ResetPasswordMail = ({ requestedAt, token }) => {
  let url = tokenToURL('/user/password/reset', token);

  return (
    <div>
      <p>
        Someone requested to reset your password at
        {' '}<time>{requestedAt.toString()}</time>.
        If you didn't ask for such request, please ignore this mail.
      </p>
      <p>
        Please follow the link to reset your email:
      </p>
      <p>
        <a href={url}>
          {url}
        </a>
      </p>
    </div>
  );
};

ResetPasswordMail.propTypes = {
  requestedAt: PropTypes.instanceOf(Date),
  token: PropTypes.string,
};

export default ResetPasswordMail;
