import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { updateLocale } from '../../actions/intlActions';

class LocaleProvider extends Component {
  componentDidMount() {
    let { dispatch, intl } = this.props;
    let lang = intl.locale || navigator.language;

    dispatch(updateLocale(lang))
      .then(() => {
        console.log('load locale (automatically) ok');
      }, (err) => {
        alert('load locale (automatically) fail', err);
      });
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

export default connect((state) => ({
  intl: state.intl,
}))(LocaleProvider);
