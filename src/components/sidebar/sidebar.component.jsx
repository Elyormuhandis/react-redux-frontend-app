import { NavLink } from 'react-router-dom';
import { sidebarData } from '../../data/sidebarData';
import {HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight} from 'react-icons/hi'
import React, { useState } from 'react';
import './sidebar.styles.scss'




const Sidebar = () => {
    const [open, setopen] = useState(false);

    const toggleOpen = () => {
        setopen(!open)
    }

    return (
<div className={open ? "sidenav" : "sidenavClosed"}>
    <button className="menuBtn" onClick={toggleOpen}>
            {open? <HiOutlineChevronDoubleLeft />: <HiOutlineChevronDoubleRight />}
    </button>
    {sidebarData.map(item =>{
        return <NavLink key={item.id} className={({isActive})=>(isActive ? "sideitem-active" : "sideitem")} to={item.link}>
                   <span className={open ? 'sidebar-icon' : 'sidebar-icon-toggle'}>{item.icon}</span>
                   <span className={open ? "linkText" : "linkTextClosed"}>{item.text}</span>
               </NavLink>
     })}
</div>
    );
};

export default Sidebar;