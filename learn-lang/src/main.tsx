
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from './Redux/store.ts'
  

const theme=createTheme({
  palette:{
    primary:{
      main:"rgb(255,0,0"
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
 
  </ThemeProvider>
   
  </BrowserRouter>,
)
