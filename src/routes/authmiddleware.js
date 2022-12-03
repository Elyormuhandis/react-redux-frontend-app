import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router"

const Authmiddleware = ({children}) =>  {
    const {userToken, userRole} = useSelector(state=>state.user)
    const location = useLocation();

    if(!userToken){
        return <Navigate to='/login' state={{from: location}}/>
    }

    return children;
};
  export default Authmiddleware;