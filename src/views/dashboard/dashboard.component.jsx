import React from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../store/features/user/userActions';
import './dashboard.styles.scss'


const Dashboard = () => {
    const dispatch = useDispatch()

    const { 
        register, 
        handleSubmit, 
        formState:{errors, isValid} } = useForm({mode:"onBlur"});
 
        const submitForm = (data) => {
            dispatch(userLogin(data))
          }

    return (
        <div className='dashboard'>
            <div className='dashboard__container'>
                <form className='division'>
                    <input 
                    type="text"
                    className='division__input'
                    placeholder='division'
                    {...register('username', {
                        required:"To'ldirilishi shart!",
                        minLength:{
                        value: 5,
                        message:"Belgilar soni 5 tadan kam!"
                    }})}
                    required
                    />
                    <button type='submit' className='division__btn'>add</button>
                </form>
                <ul>
                    <li>
                        division
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;