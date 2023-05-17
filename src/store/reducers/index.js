import { combineReducers } from 'redux';
import {rootReducer} from './rootreducer';

const mainReducer = combineReducers({
    rootReducer: rootReducer,
})

export default mainReducer;