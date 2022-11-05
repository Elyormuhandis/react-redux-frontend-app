import { useEffect } from 'react'
import {MdOutlinePersonOutline} from 'react-icons/md'
import {BsSearch} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../../store/features/user/user.slice'
import './header.styles.scss'

const Header = () => {
  const { userToken } = useSelector((state) => state.user)
  const dispatch = useDispatch()


  useEffect(() => {
    if (userToken) {

    }
  }, [userToken, dispatch])

  return (
    <header className='header'>
      <div className='header__icon'>
        Icon
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
        {userToken ? (
            <button className='personal' onClick={() => dispatch(logout())}>
              Logout
            </button>
          ) : (
            <NavLink className='personal' to='/login'>
              Login
            </NavLink>
          )}
      </div>
    </header>
  )
}

export default Header
