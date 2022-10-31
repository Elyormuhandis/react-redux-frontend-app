const { default: Drafts } = require("components/drafts/drafts.component")
const { default: Inbox } = require("components/inbox/inbox.component")
const { default: Journal } = require("components/journal/journal.component")
const { default: Send } = require("components/send/send.component")
const { default: Sent } = require("components/sent/sent.component")
const { default: Settings } = require("components/settings/settings.component")
const { default: Statistics } = require("components/statistics/statistics.component")
const { default: Trash } = require("components/trash/trash.component")
const { default: Login } = require("pages/login/login.component")

const publicRoutes = [
    { path:'login', component:Login},
]

const authProtectedRoutes = [
    { path:'send', component:Send},
    { path:'inbox', component:Inbox},
    { path:'sent', component:Sent}, 
    { path:'drafts', component:Drafts}, 
    { path:'trash', component:Trash}, 
    { path:'journal', component:Journal}, 
    { path:'statistics', component:Statistics}, 
    { path:'settings', component:Settings} 
]

export { authProtectedRoutes, publicRoutes }
