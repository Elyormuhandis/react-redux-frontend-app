import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addDivision, deleteDivision, editDivision, getDivisions } from '../../store/features/division/division.action';
import './divisions.styles.scss'





const Divisions = () => {
const [divFormToggle, setDivFormToggle] = useState(false)
const dispatch = useDispatch()
const {message, divisions} = useSelector(state => state.division)

const { 
    register, 
    handleSubmit,
    reset,
    formState:{errors, isValid} } = useForm({mode:"onBlur"});




// const asyncFunc = async()=> {
//     console.log("start")
//     await new Promise((resolve, rejected)=> setTimeout(()=> resolve(), 2000))    
//     console.log("end")
// }
// asyncFunc()



const submitForm = (data) => {
    data.active = true
    dispatch(addDivision(data));
    reset();
    setDivFormToggle(!divFormToggle);
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
        name:val+" deleted"+Date.toLocaleString(),
        active:false
    }
    dispatch(deleteDivision(data));
}

const divFormToggleHandler = () => {
    setDivFormToggle(!divFormToggle)
}

return (

        <div className='division'>
                <div className='division__header'>
                   <h4> Boshqarmalar</h4>
                   <button className='dashboard-btn' onClick={divFormToggleHandler}>YARATISH</button>
                </div>
            <form className={divFormToggle ? 'division__form' : 'division__form--toggle'} onSubmit={handleSubmit((e)=>{submitForm(e)})}>
                <label className='division__form--label' htmlFor='division-input'>Boshqarma nomi</label>
                <input 
                type="text"
                className='dashboard-input'
                id='division-input'
                placeholder='Boshqarma...'
                {...register('name', {
                    required:"To'ldirilishi shart!",
                })}
                required
                />
                <button type='submit' className='dashboard-btn dashboard-btn--success'>QO'SHISH</button>
                <button type='button' className='dashboard-btn dashboard-btn--cancel' onClick={divFormToggleHandler}>BEKOR QILISH</button>
            </form>
            <hr className='dashboard__line'/>
            <ul className='division__list'>
                {
                divisions ? divisions.filter((division)=>division.active==true).map((division, idx)=>(
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

export default Divisions;