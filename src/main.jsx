import React from 'react'
import { createRoot } from 'react-dom/client'
import { DemoLanding } from '../src/ClinicLanding'
import './styles.css'

function App() {
  return (
    <div>
      <DemoLanding />
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)
