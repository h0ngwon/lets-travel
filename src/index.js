import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/reset.css';
import App from './App';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/config/configStore';
import { GlobalStyle } from 'GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <GlobalStyle />
        <App />
        <ToastContainer />
    </Provider>,
);
