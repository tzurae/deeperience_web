import { createStore, applyMiddleware } from 'redux'
import { fromJS } from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import createLoggerMiddleware from 'redux-logger'
import rootSaga from './rootSaga'
import { rootReducer } from '../reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import LoggerSettings from '../../../configs/env/logger'

export default (initialState = {}, history) => {

  const sagaMiddleware = createSagaMiddleware()

  const logger = createLoggerMiddleware({
    collapsed: true,
    stateTransformer: state => JSON.parse(JSON.stringify(state)),
    predicate: (getState, action) => {
      let val = true
      LoggerSettings.remove.some(value => {
        if (value.test(action.type)) {
          val = false
          return true
        }
        return false
      })
      return val
    },
  })

  let middlewares = [
    routerMiddleware(history),
    sagaMiddleware,
    thunk,
  ]

  // ture if env = dev and client-side
  const isDevNClientSide = (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined')

  if (isDevNClientSide) {
    middlewares = [...middlewares, logger]
    const immutable = require('immutable')
    const installDevTools = require('immutable-devtools')
    installDevTools(immutable)
  }

  const store = createStore(
    rootReducer,
    initialState,
    isDevNClientSide ? (
      composeWithDevTools(applyMiddleware(...middlewares))
    ) : (
      applyMiddleware(
        ...middlewares
      )
    )
  )

  store.runSaga = sagaMiddleware.run(rootSaga)

  return store
}
