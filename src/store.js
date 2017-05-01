import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { reducer as formReducer } from 'redux-form'

const logger = createLogger({diff: false})

const middlewares = applyMiddleware(
  logger
)

import boardReducer from './reducers/boardReducer'

const reducers = combineReducers({
  form: formReducer,
  board: boardReducer
})

export default compose(
  middlewares,
  window.devToolsExtension ? window.devToolsExtension() : f => f, // debug mode
)(createStore)(reducers)
