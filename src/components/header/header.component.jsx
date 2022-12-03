import {MdOutlinePersonOutline} from 'react-icons/md'
import {BsSearch} from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/features/user/user.slice'
import './header.styles.scss'

const Header = () => {
  const dispatch = useDispatch()
  
  return (
    <header className='header'>
      <div className='header__icon'>
        FILE TRANSFER
      </div>
      <div className='header__options'>
        <div className='searchbox'>
            <input className='searchbox__input' placeholder='Nima qidiramiz...'/>
            <span className='searchbox__icon'><BsSearch/></span>
        </div>
            <select className='select'>
            <option value="uzbek">O'ZBEK</option>
            <option value="rus">RUS</option>
            </select>
        <span className='personal'><MdOutlinePersonOutline/></span>
        {
            <button className='personal' onClick={() => dispatch(logout())}>
              Logout
            </button>
        } 
      </div>
    </header>
  )
}

export default Header
