import Immutable from 'immutable'
import { EditorState } from 'draft-js'
import createReducer from '../../lib/configureReducer'

const {
  CREATE_SITE_REQUEST,
  CREATE_SITE_SUCCESS,
  CREATE_SITE_FAILURE,
  CREATE_SITE_ERROR,
  CREATE_SITE_NEXT_PAGE,
  CREATE_SITE_PREVIOUS_PAGE,
  CREATE_SITE_SET_PAGE,
  CREATE_SITE_SET_SUBSITE_ACTIVE,
  CREATE_SITE_SET_DONE,
  CREATE_SITE_UPDATE_INTRO_EDITOR,
  CREATE_SITE_UPDATE_MAIN_SITE_EDITOR,
} = require('../../constants/ActionTypes').default

const initialState = Immutable.fromJS({
  createPage: {
    page: 0,
    done: new Array(...{ length: 6 }).map(() => false),
    subsiteActiveArr: [],
    introEditorContent: EditorState.createEmpty().getCurrentContent().toJS(),
    mainSiteEditorContent: EditorState.createEmpty().getCurrentContent().toJS(),
  },
  error: '',
})

export default createReducer(initialState, {
  [CREATE_SITE_REQUEST](state, action) { return state },
  [CREATE_SITE_SUCCESS](state, action) {
    return state.setIn(['createPage', 'done'],
      state.getIn(['createPage', 'done']).map(() => true))
  },
  [CREATE_SITE_FAILURE](state, action) { return state },
  [CREATE_SITE_ERROR](state, action) {
    return state.set('error', action.payload.error)
  },
  [CREATE_SITE_NEXT_PAGE](state, action)  {
    return state.setIn(['createPage', 'page'], state.getIn(['createPage', 'page']) + 1)
  },
  [CREATE_SITE_PREVIOUS_PAGE](state, action)  {
    return state.setIn(['createPage', 'page'], state.getIn(['createPage', 'page']) - 1)
  },
  [CREATE_SITE_SET_PAGE](state, action)  {
    return state.setIn(['createPage', 'page'], action.payload.page)
  },
  [CREATE_SITE_SET_SUBSITE_ACTIVE](state, action)  {
    return state.setIn(['createPage', 'subsiteActiveArr'], action.payload.arr)
  },
  [CREATE_SITE_SET_DONE](state, action)  {
    return state.setIn(['createPage', 'done'], action.payload.done)
  },
  [CREATE_SITE_UPDATE_INTRO_EDITOR](state, action)  {
    return state.setIn(['createPage', 'introEditorContent'], action.payload.nextContent)
  },
  [CREATE_SITE_UPDATE_MAIN_SITE_EDITOR](state, action) {
    return state.setIn(['createPage', 'mainSiteEditorContent'], action.payload.nextContent)
  },
})
