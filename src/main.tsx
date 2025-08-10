import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ImageProvider } from './hooks/useImagePreview'
import { ToastProvider } from './hooks/useToast'
import routes from './routes'
import './styles/index.css'

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <ImageProvider>
        <RouterProvider router={router} />
      </ImageProvider>
    </ToastProvider>
  </StrictMode>,
)
