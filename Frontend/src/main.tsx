import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/Dashboard.tsx'
import LandingPage from './pages/LandingPage.tsx'
import CoinExchangesPage from './pages/CoinExchangesPage.tsx'
import CoinPage from './pages/CoinPage.tsx'

const router = createBrowserRouter([
  {
    Component: App, 
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: LandingPage,
          },
          {
            path: 'exchanges',
            Component: CoinExchangesPage,
          },
          {
            path: '/coin/:id',
            Component: CoinPage,
          }
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
