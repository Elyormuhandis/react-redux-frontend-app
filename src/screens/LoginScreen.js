import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../store/features/user/userActions'
import { useEffect } from 'react'
import Error from '../components/Error'

const LoginScreen = () => {
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
      navigate('/user-profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    dispatch(userLogin(data))
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {error && <Error>{error}</Error>}
      <div className='form-group'>
      <label htmlFor='username'>Username</label>
          <input
          className='form-input'
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
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-input'
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
      </div>
      <button type='submit' className='button' disabled={loading || !isValid}>
        Login
      </button>
    </form>
  )
}

export default LoginScreen
