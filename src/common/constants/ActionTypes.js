import keyMirror from 'key-mirror'

export default keyMirror({

  // ------ global ------
  SET_API_ENGINE: null,

  // -------Back-end ------

  GET_DATA_FROM_API_SERVER_REQUEST: null,
  GET_DATA_FROM_API_SERVER_SUCCESS: null,
  GET_DATA_FROM_API_SERVER_FAILURE: null,

  // ------ user ------
  LOGIN: null,
  LOGIN_REQUEST: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,
  LOGIN_USER: null,
  LOGOUT_USER: null,

  LOGOUT: null,
  LOGOUT_REQUEST: null,
  LOGOUT_SUCCESS: null,
  LOGOUT_FAILURE: null,

  // ------ cookie ------

  SET_COOKIE: null,
  SET_COOKIE_REQUEST: null,
  SET_COOKIE_SUCCESS: null,
  SET_COOKIE_FAILURE: null,

  REMOVE_COOKIE: null,
  REMOVE_COOKIE_REQUEST: null,
  REMOVE_COOKIE_SUCCESS: null,
  REMOVE_COOKIE_FAILURE: null,

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
