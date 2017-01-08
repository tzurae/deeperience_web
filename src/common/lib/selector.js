import { createSelectorCreator, defaultMemoize } from 'reselect'
import _ from 'lodash'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual,
)

const selectCookies = () => state => state.get('cookies')
const selectAuth = () => state => state.get('auth')
const selectGlobal = () => state => state.get('global')
const selectRouter = () => state => state.get('routing')
const selectTab = () => state => state.get('tab')

const selectFromCookies = (property) => createDeepEqualSelector(
  selectCookies(),
  cookiesState => cookiesState.get(property)
)

const selectAuthState  = () => createDeepEqualSelector(
  selectAuth(),
  authState => authState.get('isAuth')
)

const selectFromGlobal = (property) => createDeepEqualSelector(
  selectGlobal(),
  globalState => globalState.get(property)
)

const selectFromRouting = (property) => createDeepEqualSelector(
  selectRouter(),
  routerState => routerState.get(property)
)

const selectFromTab = (property) => createDeepEqualSelector(
  selectTab(),
  tabState => tabState.get(property)
)

export {
  selectFromGlobal,
  selectFromRouting,
  selectFromCookies,
  selectAuthState,
  selectFromTab,
}
