import keyMirror from 'key-mirror'

export default keyMirror({

  // ------- tab --------
  TAB_CHANGE: null,

  // ------ global ------
  SET_API_ENGINE: null,
  UPDATE_LOCALE: null,

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

  REGISTER: null,
  REGISTER_REQUEST: null,
  REGISTER_SUCCESS: null,
  REGISTER_FAILURE: null,

  OPEN_REGISTER_VERIFY_MODAL: null,
  CLOSE_REGISTER_VERIFY_MODAL: null,

  SET_USER: null,
  REMOVE_USER: null,

  // ------ cookie ------
  SET_COOKIE: null,
  SET_COOKIE_REQUEST: null,
  SET_COOKIE_SUCCESS: null,
  SET_COOKIE_FAILURE: null,

  REMOVE_COOKIE: null,
  REMOVE_COOKIE_REQUEST: null,
  REMOVE_COOKIE_SUCCESS: null,
  REMOVE_COOKIE_FAILURE: null,

  // ------ error ------
  PUSH_ERRORS: null,
  REMOVE_ERROR: null,

  // ------ page ------
  SET_PAGE: null,
  SET_CURRENT_PAGE: null,

  // ------ trip ------
  SET_CREATE_TRIP_DATA: null,
  RESET_CREATE_TRIP_DATA: null,

  LIST_GUIDE_SITES: null,
  LIST_GUIDE_SITES_REQUEST: null,
  LIST_GUIDE_SITES_SUCCESS: null,
  LIST_GUIDE_SITES_FAILURE: null,

  CREATE_TRIP: null,
  CREATE_TRIP_REQUEST: null,
  CREATE_TRIP_SUCCESS: null,
  CREATE_TRIP_FAILURE: null,
  CREATE_TRIP_BRANCH_ERROR: null,
  CREATE_TRIP_NEXT_PAGE: null,
  CREATE_TRIP_PREVIOUS_PAGE: null,
  CREATE_TRIP_SET_PAGE: null,
  CREATE_TRIP_SET_DONE: null,
  CREATE_TRIP_SET_SUBMIT_ERROR: null,
  CREATE_TRIP_SET_SHOW_DAY: null,
  CREATE_TRIP_SET_TOTAL_DAY: null,
  CREATE_TRIP_SET_FLOAT_WINDOW: null,
  CREATE_TRIP_SET_COVER_PIC: null,
  CREATE_TRIP_SET_TREE_PIC: null,

  // ------ site ------
  CREATE_SITE: null,
  CREATE_SITE_REQUEST: null,
  CREATE_SITE_SUCCESS: null,
  CREATE_SITE_FAILURE: null,

  CREATE_SITE_ERROR: null,
  CREATE_SITE_NEXT_PAGE: null,
  CREATE_SITE_PREVIOUS_PAGE: null,
  CREATE_SITE_SET_PAGE: null,
  CREATE_SITE_SET_SUBSITE_ACTIVE: null,
  CREATE_SITE_SET_DONE: null,
  CREATE_SITE_UPDATE_INTRO_EDITOR: null,
  CREATE_SITE_UPDATE_MAIN_SITE_EDITOR: null,

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
