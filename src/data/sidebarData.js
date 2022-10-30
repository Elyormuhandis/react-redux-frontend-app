import {CiHome, MdTravelExplore, AiOutlineBarChart, CiSettings} from 'react-icons'

export const sidebarData = [
    {
        id: 0,
        icon: <CiHome/>,
        text: "Home",
        link: "/"
    },
    {
        id: 1,
        icon: <MdTravelExplore/>,
        text: "Explore",
        link: "explore"
    },
    {
        id: 2,
        icon: <AiOutlineBarChart/>,
        text: "Statistics",
        link: "statistics"
    },
    {
        id: 3,
        icon: <CiSettings/>,
        text: "Settings",
        link: "settings"
    }
]