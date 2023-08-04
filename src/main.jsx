import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App(){
  return (
    <button class="btn btn-primary">Button</button>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
