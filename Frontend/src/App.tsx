import { Route, Routes } from 'react-router-dom'
import './App.css'
import RootLayout from './layout/RootLayout'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<RootLayout />} />
      </Routes>
    </>
  )
}

export default App
