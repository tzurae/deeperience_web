import Immutable from 'immutable'
import { EditorState } from 'draft-js'

const {
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

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SITE_ERROR:
      return state.set('error', action.payload.error)

    case CREATE_SITE_NEXT_PAGE:
      return state.setIn(['createPage', 'page'], state.getIn(['createPage', 'page']) + 1)

    case CREATE_SITE_PREVIOUS_PAGE:
      return state.setIn(['createPage', 'page'], state.getIn(['createPage', 'page']) - 1)

    case CREATE_SITE_SET_PAGE:
      return state.setIn(['createPage', 'page'], action.payload.page)

    case CREATE_SITE_SET_SUBSITE_ACTIVE:
      return state.setIn(['createPage', 'subsiteActiveArr'], action.payload.arr)

    case CREATE_SITE_SET_DONE:
      return state.setIn(['createPage', 'done'], action.payload.done)

    case CREATE_SITE_UPDATE_INTRO_EDITOR:
      return state.setIn(['createPage', 'introEditorContent'], action.payload.nextContent)

    case CREATE_SITE_UPDATE_MAIN_SITE_EDITOR:
      return state.setIn(['createPage', 'mainSiteEditorContent'], action.payload.nextContent)

    default:
      return state
  }
}
