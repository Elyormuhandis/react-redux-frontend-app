import Header from '../../components/header/header.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import React from 'react';
import { Outlet } from 'react-router-dom';
import './layout.styles.scss'

const Layout = () => {
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