import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { useRouterHistory, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { rootReducer } from '../../common/reducers'
import ApiEngine from '../../common/utils/ApiEngine'
import { setApiEngine } from '../../common/reducers/global/globalActions'
import GlobalInitialState from '../../common/reducers/global/globalInitialState'

const getInitialState = () => ({
  global: new GlobalInitialState(),
})


export default (req, res, next) => {
  // ref:
  //  - <https://github.com/reactjs/react-router-redux/issues/182#issuecomment-178701502>
  //  - <http://stackoverflow.com/questions/34821921/browserhistory-undefined-with-react-router-2-00-release-candidates>
  //  - <https://github.com/reactjs/react-router-redux/blob/master/examples/server/server.js>
  const memoryHistory = useRouterHistory(createMemoryHistory)(req.url)
  const store = createStore(
    rootReducer,
    getInitialState(),
    applyMiddleware(
      routerMiddleware(memoryHistory),
      thunk
    )
  )
  const history = syncHistoryWithStore(memoryHistory, store)
  req.store = store
  req.history = history
  const apiEngine = new ApiEngine(req)
  req.store.dispatch(setApiEngine(apiEngine))
  next()
}
