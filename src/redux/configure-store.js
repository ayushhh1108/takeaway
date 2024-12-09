import { applyMiddleware, createStore } from 'redux';
import createReducer from './reducers';
import thunk from 'redux-thunk';

const reducers = createReducer();

export default createStore(
    reducers,
    applyMiddleware(thunk)
);
