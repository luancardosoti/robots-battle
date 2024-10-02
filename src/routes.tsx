import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/app/home'
import { AppLayout } from './pages/_layouts/app'
import { BattleArena } from './pages/app/battle-arena'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/arena-de-batalha', element: <BattleArena /> },
    ],
  },
])
