import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import HomeScreen from './screens/HomeScreen'
import ProtectedRoute from './routing/ProtectedRoute'
import './App.css'
import Login from './pages/login/login.component'
import Sidebar from 'components/sidebar/sidebar.component'

function App() {
  return (
     <div className='App'>
      <Login/>
      <Sidebar/>
      <Header />
      <main>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<HomeScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route element={<ProtectedRoute />}>
            <Route path='/user-profile' element={<ProfileScreen />} />
            <Route  path="/" element={<HomeScreen />}/>
          <Route path="/explore" el ement={<Explore />} />
          <Route path="/statistics" element={<Statistics />}/>
          <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </main>
     </div>
  )
}

export default App
