import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './pages/layout/layout.component'
import './App.css'
import Login from './pages/login/login.component'
import  {adminRoutes, authProtectedRoutes} from './routes/index' 
import Authmiddleware from './routes/authmiddleware'
import { useSelector } from 'react-redux'
  


const App = () => {

   const {userRole} = useSelector(state=>state.user)


  return (
     <div className='App'>
       <Routes>
             <Route path='/login' element={<Login/>}/> 
             <Route 
             path='/' 
             element={
             <Authmiddleware>   
                <Layout/>
             </Authmiddleware>

             }>
               {authProtectedRoutes.map((route, idx)=>(
                  <Route 
                  key={idx} 
                  path={route.path} 
                  element={
                           <Authmiddleware>   
                              {route.element}
                           </Authmiddleware>
                           }/> 
                  ))}
                  <Route
                  path="/"
                  element={<Navigate replace to={userRole==="ADMIN" ? "dashboard" : "send"} />}/>
             </Route>
        </Routes>    
     </div>
  )
}

export default App
