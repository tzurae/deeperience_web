import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { updateLocale } from '../actions/intlActions';

class LocaleProvider extends Component {
  componentDidMount() {
    let lang = this.context.store.getState().intl.locale || navigator.language;
    this.props
      .dispatch(updateLocale(lang))
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

LocaleProvider.contextTypes = {
  store: PropTypes.object.isRequired,
};

export default connect((state) => state)(LocaleProvider);
