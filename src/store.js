import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';

const logger = createLogger({diff: false});

const middlewares = applyMiddleware(
  logger
);

import boardReducer from './reducers/boardReducer'

const reducers = combineReducers({
  board: boardReducer
});

export default compose(
  middlewares,
  window.devToolsExtension ? window.devToolsExtension() : f => f, // debug mode
)(createStore)(reducers);

