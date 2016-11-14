// ref:
//   - <https://github.com/erikras/redux-form/issues/1880>
import React, { PropTypes } from 'react';
import GoogleRecaptcha from 'react-google-recaptcha';
import configs from '../../../../../configs/project/client';

let Recaptcha = ({ input, disableHint, ...rest }) => (
  configs.recaptcha ? (
    <GoogleRecaptcha
      sitekey={configs.recaptcha[process.env.NODE_ENV].siteKey}
      onChange={input.onChange}
      {...rest}
    />
  ) : (
    <span>
      {disableHint}
    </span>
  )
);

Recaptcha.propTypes = {
  input: PropTypes.object.isRequired,
  disableHint: PropTypes.node,
};

Recaptcha.defaultProps = {
  disableHint: (
    <pre>
      Recaptcha is disabled
    </pre>
  ),
};

export default Recaptcha;
