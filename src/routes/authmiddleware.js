import { Navigate, Route, useLocation } from "react-router"

const Authmiddleware = ({path, component}) =>     
    {
        const location = useLocation();
        const auth = false;
    
        if(auth){
            return (<Navigate to="/login" state= {{ from: location }}/>)      
        }
        return <Route path={path} element={component}/>
 
    }



  export default Authmiddleware;