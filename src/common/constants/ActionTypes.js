import keyMirror from 'key-mirror'

export default keyMirror({
  // ------ global ------
  SET_API_ENGINE: null,

  // ------ user ------
  LOGIN: null,
  LOGIN_REQUEST: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,
  LOGIN_USER: null,
  LOGOUT_USER: null,

  // ------ cookie ------
  COOKIE_REQUEST: null,
  COOKIE_SUCCESS: null,
  COOKIE_FAILURE: null,
  SET_COOKIE: null,

  // ------ intl ------
  UPDATE_LOCALE: null,

  // ------ error ------
  PUSH_ERRORS: null,
  REMOVE_ERROR: null,

  // ------ page ------
  SET_PAGE: null,
  SET_CURRENT_PAGE: null,

  // ------ trip ------
  SET_OWN_SITE: null,
  SET_CREATE_TRIP_DATA: null,
  RESET_CREATE_TRIP_DATA: null,

  CREATE_TRIP_ERROR: null,
  CREATE_TRIP_NEXT_PAGE: null,
  CREATE_TRIP_PREVIOUS_PAGE: null,
  CREATE_TRIP_SET_PAGE: null,

  // ------ site ------
  CREATE_SITE_ERROR: null,
  CREATE_SITE_NEXT_PAGE: null,
  CREATE_SITE_PREVIOUS_PAGE: null,
  CREATE_SITE_SET_PAGE: null,
  CREATE_SITE_SET_SUBSITE_ACTIVE: null,
  CREATE_SITE_SET_DONE: null,

  // ------ custom ------
  CUSTOM_PHASE_NEXT_PAGE: null,
  CUSTOM_PHASE_PREVIOUS_PAGE: null,
  CUSTOM_PHASE_SET_PAGE: null,
  CUSTOM_PHASE_OPEN_ADVICE_MODAL: null,
  CUSTOM_PHASE_CLOSE_ADVICE_MODAL: null,

  // ------ order ------
  ORDER_PHASE_NEXT_PAGE: null,
  ORDER_PHASE_PREVIOUS_PAGE: null,
  ORDER_PHASE_SET_PAGE: null,
})
