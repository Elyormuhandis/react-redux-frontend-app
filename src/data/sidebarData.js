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
        link: "dashboard"
    },
    {
        id: 1,
        icon: <MdOutlineMarkEmailUnread/>,
        text: "KELGAN",
        link: "inbox"
    },
    {
        id: 2,
        icon: <FiSend/>,
        text: "YARATISH",
        link: "send"
    },
    {
        id: 3,
        icon: <BiMailSend/>,
        text: "YUBORILGAN",
        link: "sent"
    },
    {
        id: 4,
        icon: <MdOutlineDrafts/>,
        text: "QORALAMA",
        link: "drafts"
    },
    {
        id: 5,
        icon: <BsTrash/>,
        text: "KORZINKA",
        link: "trash"
    },
    {
        id: 6,
        icon: <BsJournalText/>,
        text: "JURNAL",
        link: "journal"
    },
    {
        id: 7,
        icon: <AiOutlineBarChart/>,
        text: "STATISTIKA",
        link: "statistics"
    },
    {
        id: 8,
        icon: <RiSettingsLine/>,
        text: "SOZLAMALAR",
        link: "settings",
    }
]