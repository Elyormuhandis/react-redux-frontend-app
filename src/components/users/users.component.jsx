import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addDivision, deleteDivision, editDivision, getDivisions } from '../../store/features/division/division.action';
import './users.styles.scss'





const Users = () => {
const [formToggle, setFormTogge] = useState(false)

const dispatch = useDispatch()
const {message, divisions} = useSelector(state => state.division)

const { 
    register, 
    handleSubmit, 
    formState:{errors, isValid} } = useForm({mode:"onBlur"});



useEffect(()=>{
    dispatch(getDivisions())
}, [])

const submitForm = (data) => {
    data.active = true //inputni valuesini bo'shatish kerak
    // dispatch(addDivision(data));
    }
    
const editHandle = (e, val) => {
    e.preventDefault();
    const data = {
        id:e.currentTarget.id,
        name:val,
        active:true
    }
    dispatch(editDivision(data));
}
const deleteHandle = (e, val) => {
    e.preventDefault();

    const data = {
        id:e.currentTarget.id,
        name:val+" deleted", //time qo'shish kerak
        active:false
    }
    dispatch(deleteDivision(data));
}

const formToggeHandler = () => {
    setFormTogge(!formToggle);
}


return (

        <div className='users'>
            <div className='users__header'>
            <h4>Foydalanuvchilar</h4>
            <button className='dashboard-btn' onClick={formToggeHandler}>YARATISH</button>
            </div>
            <form className={formToggle ? 'users__form' : 'form-toggle'} onSubmit={handleSubmit((e)=>{submitForm(e)})}>
                <label className='users__label' htmlFor='fish-input'>F.I.Sh</label>
                <input 
                id='fish-input'
                type="text"
                className='dashboard-input users-input'
                placeholder='Ism sharifingiz...'
                {...register('name', {
                    required:"To'ldirilishi shart!",
                })}
                required
                />
                <label className='users__label' htmlFor='login-input'>Login kiriting</label>
                <input 
                id='login-input'
                type="text"
                className='dashboard-input users-input'
                placeholder='Login...'
                {...register('name', {
                    required:"To'ldirilishi shart!",
                })}
                required
                />
                <label className='users__label' htmlFor='parol-input'>Parol kiriting</label>
                <input 
                id='parol-input'
                type="password"
                className='dashboard-input users-input'
                placeholder='Parol...'
                {...register('name', {
                    required:"To'ldirilishi shart!",
                })}
                required
                />
                <label className='users__label' htmlFor='parol2-input'>Parolni tasdiqlang</label>
                <input 
                id='parol2-input'
                type="password"
                className='dashboard-input users-input'
                placeholder='Parol...'
                {...register('name', {
                    required:"To'ldirilishi shart!",
                })}
                required
                />
                <label className='users__label' htmlFor='division-select'>Boshqarma</label>
                <select className='users__select' id='division-select'>
                    {
                    divisions ? divisions.filter((division)=>division.active===true).map((division, idx)=>(
                        <option className='division__list--item' key={division.id}>
                                {division.name}
                        </option>
                    )) : <option>Server bilan aloqa yo'q</option>
                    }
                </select>
                <label className='users__label' htmlFor='role-select'>Foydalanuvchi turi</label>
                <select className='users__select' id='role-select'>
                    {
                    divisions ? divisions.filter((division)=>division.active===true).map((division, idx)=>(
                        <option className='division__list--item' key={division.id}>
                                {division.name}
                        </option>
                    )) : <option>Server bilan aloqa yo'q</option>
                    }
                </select>
                <button type='submit' className='dashboard-btn dashboard-btn--success'>QO'SHISH</button>
                <button type='button' className='dashboard-btn users-btn dashboard-btn--cancel' onClick={formToggeHandler}>BEKOR QILISH</button>
            </form>
            <hr className='dashboard__line'/>
            <ul className='users__list'>
                {
                divisions ? divisions.filter((division)=>division.active===true).map((division, idx)=>(
                    <li className='division__list--item' key={division.id}>
                        <div className='item-name'>
                            <span className='id'>{idx+1}.</span>
                            <span className='name'>{division.name}</span>
                            </div>
                            <div className='icons'>
                            <span 
                            className='edit-icon'
                            onClick={(e)=> editHandle(e, prompt())} 
                            id={division.id}
                            ><MdEdit/></span>
                            <span 
                            className='delete-icon'
                            onClick={(e)=> deleteHandle(e, division.name)} 
                            id={division.id}
                            ><MdDelete/></span>
                            </div>
                    </li>
                )) : <li>Server bilan aloqa yo'q</li>}
            </ul>
        </div>
);
};

export default Users;