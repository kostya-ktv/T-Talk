import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss'
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>  
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
    
  document.getElementById('root')
);

reportWebVitals();
