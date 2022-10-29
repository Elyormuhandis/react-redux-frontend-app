import { useSelector } from 'react-redux'
import '../styles/profile.css'

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.user)

  return (
    <div>
      <figure>{userInfo?.message}</figure>
      <span>
        Welcome <strong>{userInfo?.message}!</strong> You can view this page
        because you're logged in
      </span>
    </div>
  )
}

export default ProfileScreen
