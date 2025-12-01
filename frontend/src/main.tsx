import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StudentCourseTracker from './app/App.tsx'
import ReduxProvider from './app/reduxProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider>
      <StudentCourseTracker />
    </ReduxProvider>
  </StrictMode>,
)
