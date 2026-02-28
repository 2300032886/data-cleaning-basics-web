import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AppProvider } from './context/AppContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Upload from './pages/Upload'
import CleanDashboard from './pages/CleanDashboard'
import Visualize from './pages/Visualize'
import Export from './pages/Export'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <BrowserRouter>
          <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/upload" element={<PrivateRoute><Upload /></PrivateRoute>} />
                <Route path="/clean" element={<PrivateRoute><CleanDashboard /></PrivateRoute>} />
                <Route path="/visualize" element={<PrivateRoute><Visualize /></PrivateRoute>} />
                <Route path="/export" element={<PrivateRoute><Export /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                fontWeight: 600,
                fontSize: '0.88rem',
              },
              success: { iconTheme: { primary: '#4ade80', secondary: 'white' } },
              error: { iconTheme: { primary: '#f87171', secondary: 'white' } },
            }}
          />
        </BrowserRouter>
      </AuthProvider>
    </AppProvider>
  )
}
