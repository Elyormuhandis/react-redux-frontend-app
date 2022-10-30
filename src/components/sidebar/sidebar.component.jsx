import { sidebarData } from 'data/sidebarData';
import {HiOutlineChevronDoubleLeft} from 'react-icons/hi'
import React from 'react';

const Sidebar = () => {
    return (
<div>
    <button className={styles.menuBtn}>
        <HiOutlineChevronDoubleLeft />
    </button>
    {sidebarData.map(item =>{
        return <div key={item.id} className={styles.sideitem}>
	                {item.icon}
	                <span className={styles.linkText}>{item.text}</span>
		       </div>
        })}
 </div>
    );
};

export default Sidebar;