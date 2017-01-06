import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { match, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, push } from 'react-router-redux'
import LocaleProvider from '../common/components/utils/LocaleProvider'
import getRoutes from '../common/routes'
import setupLocale from './setupLocale'
import setupNProgress from './setupNProgress'
import setupGA from './setupGA'
import { setApiEngine } from '../common/reducers/global/globalActions'
import { removeCookie } from '../common/reducers/cookie/cookieActions'
import ApiEngine from '../common/utils/ApiEngine'
import configureStore from '../common/lib/configureStore'

setupNProgress()
setupLocale()

const logPageView = setupGA()

const initialState = window.__INITIAL_STATE__

const store = configureStore(initialState, browserHistory)

const apiEngine = new ApiEngine()

store.dispatch(setApiEngine(apiEngine))

const redirect = store.getState().getIn(['cookies', 'redirect'])

if (redirect) {
  store.dispatch(push(redirect))
  store.dispatch(removeCookie('redirect'))
}

// refs:
// - <http://www.jianshu.com/p/b3ff1f53faaf>
// - <https://github.com/ryanflorence/example-react-router-server-rendering-lazy-routes>
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toJS()
  },
})
const routes = getRoutes(store)
match({
  history,
  routes,
}, (error, redirectLocation, renderProps) => {
  if (error) console.log(error)
  render(
    <Provider store={store}>
      <LocaleProvider>
        <Router
          history={history}
          onUpdate={logPageView}
          {...renderProps}
        >
          {routes}
        </Router>
      </LocaleProvider>
    </Provider>
  , document.getElementById('root'))
})
