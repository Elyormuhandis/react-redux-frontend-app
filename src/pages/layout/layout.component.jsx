import Header from '../../components/header/header.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './layout.styles.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getRole, getRoles, getUsers } from '../../store/features/user/user.actions';
import { getDivisions } from '../../store/features/division/division.action';
import { getAllByFromDivision, getAllByToDivision } from '../../store/features/attachment/attachment.actions';


const Layout = () => {
    const {userRole} = useSelector(state => state.user)
    const dispatch = useDispatch() 
    useEffect(()=>{
        dispatch(getDivisions())
        if(userRole==="ADMIN") dispatch(getRoles())
        if(userRole==="ADMIN") dispatch(getUsers(0))
        if(userRole==="USER") dispatch(getAllByToDivision())
        if(userRole==="USER") dispatch(getAllByFromDivision())
        dispatch(getRole())
    }, [])


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