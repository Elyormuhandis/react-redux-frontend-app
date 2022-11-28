import {BsTrash, BsJournalText} from 'react-icons/bs'
import {FiSend, FiHome} from 'react-icons/fi'
import {MdOutlineMarkEmailUnread, MdOutlineDrafts} from 'react-icons/md';
import {BiMailSend} from 'react-icons/bi'
import {AiOutlineBarChart} from 'react-icons/ai'
import {RiSettingsLine} from 'react-icons/ri'


export const sidebarData = [
    {
        id: 0,
        icon: <FiHome/>,
        text: "DASHBOARD",
        link: "dashboard",
        className:"sidebar-dashboard"
        
    },
    {
        id: 1,
        icon: <FiSend/>,
        text: "YARATISH",
        link: "send",
        className:"sidebar__send"
        
    },
    {
        id: 2,
        icon: <BiMailSend/>,
        text: "YUBORILGAN",
        link: "sent",
        className:"sidebar__sent"
        
    },
    {
        id: 3,
        icon: <MdOutlineMarkEmailUnread/>,
        text: "KELGAN",
        link: "inbox",
        className:"sidebar__inbox"
        
    },
    {
        id: 4,
        icon: <MdOutlineDrafts/>,
        text: "QORALAMA",
        link: "drafts",
        className:"sidebar__drafts"
        
    },
    // {
    //     id: 5,
    //     icon: <BsTrash/>,
    //     text: "KORZINKA",
    //     link: "trash",
    //     className:"sidebar__trash"
        
    // },
    {
        id: 6,
        icon: <BsJournalText/>,
        text: "JURNAL",
        link: "journal",
        className:"sidebar__journal"
        
    },
    // {
    //     id: 7,
    //     icon: <AiOutlineBarChart/>,
    //     text: "STATISTIKA",
    //     link: "statistics",
    //     className:"sidebar__statistics"
        
    // },
    {
        id: 8,
        icon: <RiSettingsLine/>,
        text: "SOZLAMALAR",
        link: "settings",
        className:"sidebar__settings"
        
    }
]