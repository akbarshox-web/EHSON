import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { DataProvider } from './context/DataContext'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { EhsonOluvchilarPage } from './pages/EhsonOluvchilarPage'
import { EhsonKiritishPage } from './pages/EhsonKiritishPage'
import { RecipientDetailPage } from './pages/RecipientDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/ehson-oluvchilar" element={<EhsonOluvchilarPage />} />
              <Route path="/ehson-oluvchilar/:id" element={<RecipientDetailPage />} />
              <Route path="/ehson-kiritish" element={<EhsonKiritishPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </ThemeProvider>
  )
}

export default App