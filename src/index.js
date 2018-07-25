import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { rootReducer } from './store/reducers/index';
import App from './components/app/index';

//export const ACTION_CREATE_NEW_TODO = 'ACTION_CREATE_NEW_TODO';
//export const ACTION_CHANGE_VOTE = 'ACTION_CHANGE_VOTE';
export const ACTION_SAVE_FILTER = 'ACTION_SAVE_FILTER';
export const ACTION_CREATE_NEW_TOPIC = 'ACTION_CREATE_NEW_TOPIC';
export const ACTION_CHANGE_LABEL_FILTER_STATUS = 'ACTION_CHANGE_LABEL_FILTER_STATUS';
export const ACTION_CHANGE_TODO_FILTER_STATUS = 'ACTION_CHANGE_TODO_FILTER_STATUS';


const store = createStore(rootReducer);

ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
    document.getElementById('root')
);


