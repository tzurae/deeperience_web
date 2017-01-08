import { useRouterHistory, createMemoryHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import ApiEngine from '../../common/utils/ApiEngine'
import { setApiEngine } from '../../common/reducers/global/globalActions'
import configureStore from '../../common/lib/configureStore'

export default (req, res, next) => {
  // ref:
  //  - <https://github.com/reactjs/react-router-redux/issues/182#issuecomment-178701502>
  //  - <http://stackoverflow.com/questions/34821921/browserhistory-undefined-with-react-router-2-00-release-candidates>
  //  - <https://github.com/reactjs/react-router-redux/blob/master/examples/server/server.js>
  const memoryHistory = useRouterHistory(createMemoryHistory)(req.url)
  const store = configureStore(undefined, memoryHistory)

  const history = syncHistoryWithStore(memoryHistory, store, {
    selectLocationState(state) {
      return state.get('routing').toJS()
    },
  })
  req.store = store
  req.history = history
  req.store.dispatch(setApiEngine(new ApiEngine(req)))
  next()
}
