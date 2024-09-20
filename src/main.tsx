import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'
import { DateContextProvider } from './contexts/date.context.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProjectDetails from './pages/ProjectDetails.tsx'
import HowItWorks from './pages/HowItWorks.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/tasks/:id',
    element: <ProjectDetails />
  },
  {
    path: '/faq',
    element: <HowItWorks />
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DateContextProvider>
    <RouterProvider router={router}/>
    </DateContextProvider>
  </StrictMode>,
)
