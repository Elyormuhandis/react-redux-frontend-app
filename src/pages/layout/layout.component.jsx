import { useEffect } from 'react';
import { getDivisions } from '../../store/features/division/division.action';
import { getRoles, getUsers } from '../../store/features/user/user.actions';
import Header from '../../components/header/header.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import React from 'react';
import { Outlet } from 'react-router-dom';
import './layout.styles.scss'
import { useDispatch, useSelector } from 'react-redux';

const Layout = () => {
    const dispatch = useDispatch();
    const {userToken} = useSelector(state=>state.user)
    useEffect(()=>{
        dispatch(getDivisions())
        dispatch(getRoles())
        dispatch(getUsers(0))
    }, [userToken])


    return (
        <>
        <div className='layout'>
            <div className="layout__container">
                <header className='layout__header'>
                    <Header/>
                </header>
                <main className='layout__main'>
                    <Sidebar/>
                    <div className='layout__main__container'>
                        <div className='layout__main__box'>
                            <Outlet/>
                        </div>
                    </div>
                </main>
                {/* <footer className='layout__footer'>
                    Footer
                </footer> */}
            </div>
        </div>
        </>

    );
};

export default Layout;