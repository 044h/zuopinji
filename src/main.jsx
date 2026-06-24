import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

function AppWrapper() {
  useEffect(() => {
    document.getElementById('root').classList.add('loaded')
  }, [])
  
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

root.render(<AppWrapper />)