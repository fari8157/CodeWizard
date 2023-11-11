import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import  {store} from './store/index.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {GoogleClientId} from './constants/Api.js'
import Modal from 'react-modal';
Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={GoogleClientId}>
    <App />
    </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>,
)
