import Dashboard from "../views/dashboard/dashboard.component"
import Send from "../views/send/send.component"
import Inbox from "../views/inbox/inbox.component"
import Sent from "../views/sent/sent.component"
import Drafts from "../views/drafts/drafts.component"
import Trash from "../views/trash/trash.component"
import Journal from "../views/journal/journal.component"
import Statistics from "../views/statistics/statistics.component"
import Settings from "../views/settings/settings.component"
import Login from "../pages/login/login.component"


const publicRoutes = [
    { path:'login', element:<Login/>},
]

const authProtectedRoutes = [
    { path:null, index:true, element:<Dashboard/>},
    { path:'send',  element:<Send/>},
    { path:'inbox',  element:<Inbox/>},
    { path:'sent',  element:<Sent/>}, 
    { path:'drafts',  element:<Drafts/>}, 
    { path:'trash',  element:<Trash/>}, 
    { path:'journal',  element:<Journal/>}, 
    { path:'statistics',  element:<Statistics/>}, 
    { path:'settings',  element:<Settings/>}, 
    { path:'logout',  element:<Settings/>} 
]

export { authProtectedRoutes, publicRoutes }
