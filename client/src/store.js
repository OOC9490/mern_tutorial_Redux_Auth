import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];

// prepare the redux state manager
// const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore( rootReducer, compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION_ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));

export default store;