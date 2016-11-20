/**
 * ### I18n.js
 * important
 * this is a hacky function, and might not work when changing locale
 * but it does work right now without changing locale
 */

import React from 'react'
import { FormattedMessage } from 'react-intl'
import Immutable from 'immutable'

let messages

const I18n = id => {
  if (!messages) {
    messages = Immutable.Map((<FormattedMessage id={id}/>)
      ._owner._context.intl.messages)
  }
  return messages.get(id)
}

export default I18n
