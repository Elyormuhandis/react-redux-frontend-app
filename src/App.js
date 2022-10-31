import { Routes, Route } from 'react-router-dom'
import Layout from 'pages/layout/layout.component'
import Dashboard from 'components/dashboard/dashboard.component'
import { publicRoutes } from 'routes'
import Authmiddleware from 'routes/authmiddleware'
import './App.css'

const App = () => {


  
  return (
     <div className='App'>
       <Routes>
          <Route path='/' element={<Layout/>}>
             <Route index element={<Dashboard/>}/> 
               {
                  publicRoutes.map((route, idx)=> (
                     <Authmiddleware path={route.path} component={route.component}/>
                  ))
               } 
          </Route>
        </Routes> )     
        

     </div>
  )
}

export default App
