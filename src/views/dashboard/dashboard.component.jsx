import Divisions from '../../components/divisions/divisions.component';
import Users from '../../components/users/users.component';
import './dashboard.styles.scss';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='dashboard__container'>
        <Divisions />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
