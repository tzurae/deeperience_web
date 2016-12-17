import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import { IntlProvider } from 'react-intl'
import * as globalActions from '../../reducers/global/globalActions'

const actions = [globalActions]

const mapStateToProps = state => {
  return {
    locale: state.getIn(['global', 'locale']),
    messages: state.getIn(['global', 'messages']),
  }
}

const mapDispatchToProps = dispatch => {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject()

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch,
  }
}

class LocaleProvider extends Component {
  componentDidMount() {
    const { locale } = this.props
    const lang = locale || navigator.language
    this.props.actions.updateLocale(lang)
      .then(() => {
        console.log('load locale (automatically) ok')
      }, (err) => {
        alert('load locale (automatically) fail', err)
      })
  }

  render() {
    const { children, locale, messages } = this.props

    return (
      <IntlProvider locale={locale} messages={messages.toJS()}>
        {children}
      </IntlProvider>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LocaleProvider)
