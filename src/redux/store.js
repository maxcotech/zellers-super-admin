import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

export const middlewares = [thunk];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)

const store = createStoreWithMiddleware(rootReducers, window.devToolsExtension ? window.devToolsExtension() : f => f)

export default store;