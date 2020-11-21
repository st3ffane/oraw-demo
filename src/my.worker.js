import { initWorker } from 'of-redux-and-workers';
import * as ACTIONS from './actions';

import { fibonacci } from './long.op';
const handlers = {
  [ACTIONS.HELLO]: (action, dispatch) => {
    let { payload } = action;
    let r = fibonacci(payload);
    return Promise.resolve(r);
  }
}
initWorker(handlers); // start worker thread