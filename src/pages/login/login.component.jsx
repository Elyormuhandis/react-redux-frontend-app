import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../store/features/user/user.actions'
import { useEffect } from 'react'
import Error from '../../components/Error'
import './login.styles.scss'

const Login = () => {
  const { loading, userToken, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const fromPage = location.state?.from?.pathname || '/';
  
  const { 
    register, 
    handleSubmit, 
    formState:{errors, isValid} } = useForm({mode:"onBlur"});
    
    
    // redirect authenticated user to profile screen
    useEffect(() => {
      if (userToken) {
      navigate(fromPage);
    }
  }, [navigate, userToken])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }

  return (
        <div className="login">
          <div className="login__container">
              <form className='login__form' onSubmit={handleSubmit(submitForm)}>
                  <input
                      autoComplete='off'
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
                {/* {errors?.username && <p>{errors?.username?.message || "Error!"}</p>} */}
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
                {/* {errors?.password && <p>{errors?.password?.message || "Error!"</p>} */}
                <button className="form-control login__form-btn" type='submit' disabled={!isValid}>KIRISH</button>
              </form>
              </div>
            </div> 
            )}



export default Login
