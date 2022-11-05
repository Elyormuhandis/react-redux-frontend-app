import Divisions from '../../components/divisions/divisions.component';
import Users from '../../components/users/users.component';
import './dashboard.styles.scss'


const Dashboard = () => {



    return (
        <div className='dashboard'>
        <div className='dashboard__container'>
          <Divisions/>
          <Users/>
            {/* <div className='users'>
                <form className='users__form'>
                    <label className='users__label' htmlFor='users'>
                        Foydalanuvchilar
                    </label>
                    <input 
                    id='users'
                    type="text"
                    className='dashboard-input'
                    placeholder='boshqarma nomini kiriting'
                    {...register('name', {
                        required:"To'ldirilishi shart!",
                    })}
                    required
                    />
                    <button type='submit' className='dashboard-btn'>QO'SHISH</button>
                </form>
                <hr className='division__line'/>
                <ul className='division__list'>
                    {
                    divisions.map((division)=>(
                            <li className='division__list--item' key={division.id}>
                                <div className='item-name'>
                                    <span className='id'>{division.id}.</span>
                                    <span className='name'>{division.name}</span>
                                 </div>
                                 <div className='icons'>
                                    <span 
                                    className='edit'
                                     id={division.id}
                                    ><MdEdit/></span>
                                    <span className='delete'><MdDelete/></span>
                                 </div>
                            </li>
                        ))}
                </ul>
            </div> */}
            <div>
                Statistika
            </div>
        </div>
        </div>
    );
};

export default Dashboard;