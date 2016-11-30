import ActionTypes from '../../constants/ActionTypes'

const initLocale = {
  locale: '',
  messages: '',
}

export default (state = initLocale, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_LOCALE: {
      return {
        locale: action.locale,
        messages: action.messages,
      }
    }
    default: {
      return state
    }
  }
}
