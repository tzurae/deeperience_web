import { createSelectorCreator, defaultMemoize } from 'reselect'
import isEqual from 'lodash.isEqual'

const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual,
)

const selectCookies = () => (state) => state.get('cookies')
const selectAuth = () => (state) => state.get('auth')
const selectGlobal = () => (state) => state.get('global')
const selectRouter = () => (state) => state.get('routing')

const selectSomethingFromCookies = (property) => createDeepEqualSelector(
  selectCookies(),
  (cookiesState) => cookiesState.get(property)
)

const selectAuthState  = () => createDeepEqualSelector(
  selectAuth(),
  authState => authState.get('isAuth')
)

const selectSomethingFromGlobal = (property) => createDeepEqualSelector(
  selectGlobal(),
  globalState => globalState.get(property)
)

const selectSomethingFromRouting = (property) => createDeepEqualSelector(
  selectRouter(),
  routerState => routerState.get(property)
)

export {
  selectSomethingFromGlobal,
  selectSomethingFromRouting,
  selectSomethingFromCookies,
  selectAuthState,
}