import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routerer  from './Routerer.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routerer />
  </StrictMode>,
)



