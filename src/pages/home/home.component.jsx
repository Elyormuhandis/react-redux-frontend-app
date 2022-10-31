import Header from 'components/header/header.component';
import Sidebar from 'components/sidebar/sidebar.component';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './home.styles.scss'

const Home = () => {
    return (
        <>
        <div className='home'>
            <div className="home__container">
                <Sidebar/>
                <Header/>
            </div>
        </div>
        {/* <Routes>
          <Route path='/' element={<Home/>}> */}
                {/* <Route index={true} element={<Dashboard/>}/> */}
                {/* <Route path='send' element={<Send/>}/> */}
                {/* <Route path='inbox' element={<Inbox/>}/> */}
                {/* <Route path='sent' element={<Sent/>}/> */}
                {/* <Route path='drafts' element={<Drafts/>}/> */}
                {/* <Route path='trash' element={<Trash/>}/> */}
                {/* <Route path='journal' element={<Journal/>}/> */}
                {/* <Route path='statistics' element={<Statistics/>}/> */}
                {/* <Route path='settings' element={<Settings/>}/> */}
          {/* </Route>
        </Routes> */}
        </>

    );
};

export default Home;