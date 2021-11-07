import auth from './auth'
import snackbar from './snackbar'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import ThunkMiddleware from 'redux-thunk'

const rootReducer = combineReducers({
    auth,
    snackbar
})

const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));

export { store }