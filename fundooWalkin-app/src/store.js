import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import reducer from '../src/reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './Sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(logger,sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

export default store;