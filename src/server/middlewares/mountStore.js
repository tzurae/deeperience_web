import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { useRouterHistory, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { rootReducer } from '../../common/reducers'
import ApiEngine from '../../common/utils/ApiEngine'
import { setApiEngine } from '../../common/reducers/global/globalActions'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../../common/lib/rootSaga'


export default (req, res, next) => {
  // ref:
  //  - <https://github.com/reactjs/react-router-redux/issues/182#issuecomment-178701502>
  //  - <http://stackoverflow.com/questions/34821921/browserhistory-undefined-with-react-router-2-00-release-candidates>
  //  - <https://github.com/reactjs/react-router-redux/blob/master/examples/server/server.js>
  const memoryHistory = useRouterHistory(createMemoryHistory)(req.url)
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    applyMiddleware(
      routerMiddleware(memoryHistory),
      sagaMiddleware,
      thunk
    )
  )
  store.runSaga = sagaMiddleware.run;

  const history = syncHistoryWithStore(memoryHistory, store)
  req.store = store
  req.history = history
  const apiEngine = new ApiEngine(req)
  req.store.dispatch(setApiEngine(apiEngine))
  next()
}
