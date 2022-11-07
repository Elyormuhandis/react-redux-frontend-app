import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Divisions from '../../components/divisions/divisions.component';
import Users from '../../components/users/users.component';
import { getDivisions } from '../../store/features/division/division.action';
import { getRoles, getUsers } from '../../store/features/user/user.actions';
import './dashboard.styles.scss'


const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDivisions())
        dispatch(getRoles())
        dispatch(getUsers(0))
    }, [])


    return (
        <div className='dashboard'>
        <div className='dashboard__container'>
          <Divisions/>
          <Users/>
            <div>
                Statistika
            </div>
        </div>
        </div>
    );
};

export default Dashboard;