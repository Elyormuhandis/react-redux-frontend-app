import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../store/features/user/user.actions'
import { useEffect, useState } from 'react'
import {LoginStyle, LoginContainerStyle, FromStyle, FromControlStyle, BtnStyle} from './login.styles.jsx'
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
        <LoginStyle className='login-style'>
          <LoginContainerStyle>
              <FromStyle onClick={handleSubmit(submitForm)}>
                  <FromControlStyle
                      autoComplete='off'
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
                <FromControlStyle
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
                <BtnStyle type='submit' disabled={!isValid}>KIRISH</BtnStyle>
              </FromStyle>
              </LoginContainerStyle>
            </LoginStyle> 
            )}



export default Login
