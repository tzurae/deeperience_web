import React, { Component } from 'react';
import { connect } from 'react-redux';
import reactCookie from 'react-cookie';
import { IntlProvider } from 'react-intl';
import localeAPI from '../api/locale';
import { updateLocale } from '../actions/intlActions';

class LocaleProvider extends Component {
  componentDidMount() {
    const cookieLocale = reactCookie.load('locale');
    let lang = cookieLocale || navigator.language;
    if (lang !== this.props.intl.locale) {
      localeAPI
        .show(lang)
        .catch((err) => {
          alert('load locale fail');
          throw err;
        })
        .then((json) => {
          this.props.dispatch(updateLocale(json));
        });
    }
  }

  render() {
    const { intl, children } = this.props;
    return (
      <IntlProvider locale={intl.locale} messages={intl.messages}>
        {children}
      </IntlProvider>
    );
  }
};

export default connect((state) => state)(LocaleProvider);
