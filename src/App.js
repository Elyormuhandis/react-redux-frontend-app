import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import HomeScreen from './screens/HomeScreen'
import ProtectedRoute from './routing/ProtectedRoute'
import './App.css'
import Login from './pages/login/login.component'

function App() {
  return (
    <Router>
      <Header />
      <main className='container content'>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<HomeScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route element={<ProtectedRoute />}>
            <Route path='/user-profile' element={<ProfileScreen />} />
          </Route>
        </Routes>
      </main>
    </Router>
  )
}

export default App
