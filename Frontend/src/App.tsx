import { Route, Routes } from 'react-router-dom'
import './App.css'
import RootLayout from './layout/RootLayout'
import { createTheme, colors, ThemeProvider } from '@mui/material'

const theme = createTheme({
  status: {
    danger: '#e43e3e'
  },
  palette: {
    secondary: {
      main: colors.orange[500]
    },
    neutral:{
      main: colors.grey[500],
      darker: colors.grey[700],
    },

  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<RootLayout />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
