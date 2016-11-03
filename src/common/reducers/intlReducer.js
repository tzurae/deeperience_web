import ActionTypes from '../constants/ActionTypes';
import messages from '../i18n/en-us';

const initLocale = {
  locale: 'en-us',
  messages: messages,
};

export default (state = initLocale, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_LOCALE: {
      return {
        locale: action.locale,
        messages: action.messages,
      };
    }
    default: {
      return state;
    }
  }
};
