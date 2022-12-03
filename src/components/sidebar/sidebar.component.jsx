import { NavLink } from 'react-router-dom';
import { sidebarData } from '../../data/sidebarData';
import {HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight} from 'react-icons/hi'
import React, { useState } from 'react';
import './sidebar.styles.scss'
import { useSelector } from 'react-redux';
import { SidebarItem } from './sidebar.styles';




const Sidebar = () => {
    const [open, setopen] = useState(false);
    const {kelganFayllar} = useSelector(state=>state.attachment)
    const {userRole} = useSelector(state=>state.user)
    const toggleOpen = () => {
        setopen(!open)
    }
    const inboxCount = kelganFayllar.filter((file)=>file.pdtv===false).length;

    return (
<div className={open ? "sidenav" : "sidenavClosed"}>
    <button className="menuBtn" onClick={toggleOpen}>
            {open? <HiOutlineChevronDoubleLeft />: <HiOutlineChevronDoubleRight />}
    </button>
    {
    userRole==="ADMIN" ? sidebarData.filter((item)=>((item.link!=="send") && (item.link!=="sent") && (item.link!=="drafts") && (item.link!=="inbox"))).map(item =>{
        return <NavLink key={item.id} className={({isActive})=>(isActive ? "sideitem-active" : "sideitem")} to={item.link}>
                   <SidebarItem inboxCount = {inboxCount}><span className={`${item.className}`+ (open ? ' sidebar-icon' : ' sidebar-icon-toggle')}>{item.icon}</span></SidebarItem>
                   <span className={open ? "linkText" : "linkTextClosed"}>{item.text}</span>
               </NavLink>
     }) : sidebarData.filter((item)=>item.link!=="dashboard").map(item =>{
        return <NavLink key={item.id} className={({isActive})=>(isActive ? "sideitem-active" : "sideitem")} to={item.link}>
                   <SidebarItem inboxCount = {inboxCount}><span className={`${item.className}`+ (open ? ' sidebar-icon' : ' sidebar-icon-toggle')}>{item.icon}</span></SidebarItem>
                   <span className={open ? "linkText" : "linkTextClosed"}>{item.text}</span>
               </NavLink>
     })}
</div>
    );
};

export default Sidebar;