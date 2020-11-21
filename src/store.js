import { createStore, applyMiddleware, combineReducers } from 'redux';
import { workerAsPromiseMiddleware, workerMiddleware } from 'of-redux-and-workers';
import thunks from 'redux-thunk';
import * as ACTIONS from './actions';
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!./my.worker.js';
const worker = new Worker();

function app(state = 'none', action) {
  switch (action.type) {
    case ACTIONS.HELLO_SUCCESS: {
      return 'Button 1: ' + action.payload;
    }
    default: return state;
  }
}
const reducers = combineReducers({
  'app': app
});

export default () => createStore(
  reducers,
  applyMiddleware(
    thunks,
    workerAsPromiseMiddleware, // worker as promise must be set **BEFORE** workerMiddleware!
    workerMiddleware(worker)),
);