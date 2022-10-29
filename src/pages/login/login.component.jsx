import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../features/user/userActions'
import { useEffect } from 'react'
import Error from '../../components/Error'
import './login.styles.scss'

const Login = () => {
  const { loading, userInfo, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const { 
    register, 
    handleSubmit, 
    formState:{errors, isValid} } = useForm({mode:"onBlur"});

  const navigate = useNavigate()

  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userInfo) {
        console.log(userInfo);
      navigate('/user-profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }

  return (
    <div className='login'>
        <div className='login__container'>
            <form onSubmit={handleSubmit(submitForm)}>
               {error && <Error>{error}</Error>}
            <input
            {...register('username', {
                required:"To'ldirilishi shart!",
                minLength:{
                value: 5,
                message:"Belgilar soni 5 tadan kam!"
                }
            })}
            required
            />
            {errors?.username && <p>{errors?.username?.message || "Error!"}</p>}
            <input
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
            {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
            <button type='submit' disabled={!isValid}>KIRISH</button>
            </form>
        </div>
    </div>
  )
}

export default Login
