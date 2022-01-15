import {createStore,applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

export const middlewares = [thunk];
export const composeEnhancers = composeWithDevTools({});
const store = createStore(rootReducers,composeEnhancers(applyMiddleware(...middlewares)))

export default store;