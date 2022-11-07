import { Navigate, useLocation } from "react-router"

const Authmiddleware = ({children}) =>  {
    const location = useLocation();
    

    if(!window.localStorage.getItem('Token')){
        return <Navigate to='/login' state={{from: location}}/>
    }
    return children;
};
  export default Authmiddleware;