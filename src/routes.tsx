import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/app/Home'
import { AppLayout } from './pages/_layouts/app'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <Home /> }],
  },
])
