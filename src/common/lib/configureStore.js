import { createStore, applyMiddleware } from 'redux'
import Immutable from 'immutable'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
// import createLoggerMiddleware from 'redux-logger'
import rootSaga from './rootSaga'
import { rootReducer } from '../reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import LoggerSettings from '../../../configs/project/logger/logger'

const isImmutable = value => Immutable.Iterable.isIterable(value)

export default (initialState = {}, history) => {
  const sagaMiddleware = createSagaMiddleware()

  let middlewares = [
    routerMiddleware(history),
    sagaMiddleware,
    thunk,
  ]

  // ture if env = dev and client-side
  const isDevNClientSide = (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined')

  if (isDevNClientSide) {
    const createLoggerMiddleware = require('redux-logger')
    const logger = createLoggerMiddleware({
      collapsed: true,
      stateTransformer: state => isImmutable(state) ? state.toJS() : state,
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
    middlewares = [...middlewares, logger]
    const immutable = require('immutable')
    const installDevTools = require('immutable-devtools')
    installDevTools(immutable)
  }

  const store = createStore(
    rootReducer,
    Immutable.fromJS(initialState),
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
