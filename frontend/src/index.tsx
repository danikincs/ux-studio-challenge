import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Home from './pages/home.page';
import './assets/css/styles.scss';
import { ToastContainer } from 'react-toastify';

//fonts
import './assets/fonts/Glysa.otf';
import './assets/fonts/LexendDeca-VariableFont_wght.ttf';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Home />
        <ToastContainer 
            position="bottom-right"
            theme='dark'
        />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
