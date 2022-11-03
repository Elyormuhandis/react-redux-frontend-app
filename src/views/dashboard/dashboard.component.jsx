import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addDivision, editDivision, getDivisions } from '../../store/features/division/division.action';
import './dashboard.styles.scss'


const Dashboard = () => {

    const [div, setDivisions] = useState()
    const dispatch = useDispatch()
    const {message, divisions} = useSelector(state => state.division)

    useEffect(()=>{
        dispatch(getDivisions());
    }, [])
    
    const { 
        register, 
        handleSubmit, 
        formState:{errors, isValid} } = useForm({mode:"onBlur"});
 
const submitForm = (data) => {
        data.active = true
        dispatch(addDivision(data));
        dispatch(getDivisions());
        }
        
const editHandle = (e, val) => {
        const data = {
            id:e.currentTarget.id,
            name:val,
            active:true
        }
        console.log(data);
        dispatch(editDivision(data));
        dispatch(getDivisions());
}

    return (
        <div className='dashboard'>
        <div className='dashboard__container'>
            <div className='division'>
                <form className='division__form' onSubmit={handleSubmit(submitForm)}>
                    <label className='division__label'>
                        Boshqarmalar
                    </label>
                    <input 
                    type="text"
                    className='division__input'
                    placeholder='boshqarma nomini kiriting'
                    {...register('name', {
                        required:"To'ldirilishi shart!",
                    })}
                    required
                    />
                    <button type='submit' className='division__btn'>QO'SHISH</button>
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
                                    onClick={(e)=> editHandle(e, prompt())} id={division.id}
                                    ><MdEdit/></span>
                                    <span className='delete'><MdDelete/></span>
                                 </div>
                            </li>
                        ))}
                </ul>
            </div>
            <div className='users'>
                Users
            </div>
            <div className='statistics'>
                Statistics
            </div>
        </div>
        </div>
    );
};

export default Dashboard;