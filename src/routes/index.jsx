import Dashboard from '../views/dashboard/dashboard.component';
import Send from '../views/send/send.component';
import Inbox from '../views/inbox/inbox.component';
import Sent from '../views/sent/sent.component';
import Drafts from '../views/drafts/drafts.component';
import Trash from '../views/trash/trash.component';
import Journal from '../views/journal/journal.component';
import Login from '../pages/login/login.component';

const publicRoutes = [{ path: 'login', element: <Login /> }];

const adminRoutes = [
  { path: 'dashboard', element: <Dashboard /> },
  { path: 'journal', element: <Journal /> },
];

const userRoutes = [
  { path: 'send', element: <Send /> },
  { path: 'sent', element: <Sent /> },
  { path: 'inbox', element: <Inbox /> },
  { path: 'drafts', element: <Drafts /> },
  { path: 'trash', element: <Trash /> },
  { path: 'journal', element: <Journal /> },
];

export { userRoutes, adminRoutes, publicRoutes };
