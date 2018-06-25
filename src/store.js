import { createStore } from 'redux';
import userReducer from './store/Reducer.js';

export default createStore(userReducer);