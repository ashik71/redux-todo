import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import promiseMiddleware from 'redux-promise';
import thunk  from 'redux-thunk';

import Reducer from './reducers';

const createStoreWithMiddleWare = applyMiddleware(promiseMiddleware, thunk )(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleWare(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
