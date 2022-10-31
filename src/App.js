import { Routes, Route, useNavigate } from 'react-router-dom'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import './App.css'
import Login from './pages/login/login.component'
import Sidebar from 'components/sidebar/sidebar.component'
import Home from 'pages/home/home.component'
import { useState } from 'react'

function App() {
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate()

  return (
     <div className='App'>
      <main>
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Home />} />
            {/* <Route path='/register' element={<RegisterScreen />} /> */}
            <Route path='/user-profile' element={<ProfileScreen />} />
         {/* <Route path="/statistics" element={<Statistics />}/>
          <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </main>
     </div>
  )
}

export default App
