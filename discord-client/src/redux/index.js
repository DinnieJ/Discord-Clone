import authReducer from './auth'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import ThunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));

export { store }