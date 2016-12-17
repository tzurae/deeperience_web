import Immutubale, { Map, List } from 'immutable'

const configureReducer = (initialState, handlers) => (state = initialState, action) => {
  // is Immutalbe? transfer it if state is not immutable
  if (!Map.isMap(state) && !List.isList(state)) {
    state = Immutubale.fromJS(state)
  }

  const handler = handlers[action.type]

  if (!handler) {
    return state
  }

  state = handler(state, action)

  if (!Map.isMap(state) && !List.isList(state)) {
    throw new TypeError('Reducer must return Immutable object')
  }

  return state
}

export default configureReducer
