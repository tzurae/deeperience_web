import Immutable from 'immutable'

const configureReducer = (initialState, handlers) => (state = initialState, action = {}) => {
  // is Immutalbe? transfer it if state is not immutable
  // we chose Immutable.Iterable.isIterable() to check if the Immutalbe type is correct or not
  // becasue all collections in Immutable.js, like Map and List, use Iterable as a base class.
  if (!Immutable.Iterable.isIterable(state)) {
    state = Immutable.fromJS(state)
  }

  const handler = handlers[action.type]

  if (!handler) {
    return state
  }

  state = handler(state, action)

  if (!Immutable.Iterable.isIterable(state)) {
    throw new TypeError('Reducer must return Immutable object')
  }
  return state
}

export default configureReducer
