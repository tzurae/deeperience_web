import React from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

const LocaleProvider = ({ intl, children }) => (
  <IntlProvider locale={intl.locale} messages={intl.messages}>
    {children}
  </IntlProvider>
);

export default connect((state) => state)(LocaleProvider);
