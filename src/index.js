import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/reset.css';
import App from './App';
import { Provider } from 'react-redux';
import store from 'redux/config/configStore';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
        <ToastContainer />
    </Provider>
);
