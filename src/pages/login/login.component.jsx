import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../features/user/userActions'
import { useEffect } from 'react'
import Error from '../../components/Error'
import './login.styles.scss'

const Login = () => {
  const { loading, userInfo, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const fromPage = location.state?.from.pathname || '/';
  
  const { 
    register, 
    handleSubmit, 
    formState:{errors, isValid} } = useForm({mode:"onBlur"});
    
    
    // redirect authenticated user to profile screen
    useEffect(() => {
      if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }

  return (
        <div className="login">
        <div className="login__container">
            <form className='login__form' onSubmit={handleSubmit(submitForm)}>
              <div className='no-border form-control-lg  input-group'>
                <input
                    className='form-control login__form-input'
                    placeholder='Login kiriting...'
                    {...register('username', {
                    required:"To'ldirilishi shart!",
                    minLength:{
                    value: 5,
                    message:"Belgilar soni 5 tadan kam!"
                    }
                })}
                required
                />
              </div>
              
              {/* {errors?.username && <p>{errors?.username?.message || "Error!"}</p>} */}
              <div className='no-border form-control-lg  input-group'>
              <input
              className='form-control login__form-input'
              placeholder='Parol kiriting...'
              type='password'
              {...register('password',{
                  required:"To'ldirilishi shart!",
                  minLength:{
                      value: 5,
                      message:"Belgilar soni 5 tadan kam!"
                  }
              })}
              required
              />
              </div>
              {/* {errors?.password && <p>{errors?.password?.message || "Error!"}</p>} */}
              <button className="mb-3 btn-round btn btn-primary btn-lg btn-block login__form-btn" type='submit' disabled={!isValid}>KIRISH</button>
            </form>
            </div>
            </div>
 )
}

export default Login
