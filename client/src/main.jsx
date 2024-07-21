import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Contextprovider } from './context/userContex.jsx'
import { Carprovider } from './context/carContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Contextprovider>
      <Carprovider>
        <App />
      </Carprovider>
    </Contextprovider>
  </React.StrictMode>,
)
