import React, { useEffect, useState } from 'react';
import { MdDelete, MdOutlineRemoveRedEye } from 'react-icons/md';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, editUser, getRole, getRoles, getUsers } from '../../store/features/user/user.actions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import './users.styles.scss'





const Users = () => {
const [formToggle, setFormTogge] = useState(false)

const dispatch = useDispatch()

const {userInfo, users, roles, role} = useSelector(state => state.user)
const {message, divisions} = useSelector(state => state.division)


const formSchema = Yup.object().shape({
    password: Yup.string()
        .required("Password is required")
        .min(4, "Password length should be at least 4 characters")
        .max(20, "Password cannot exceed more than 12 characters"),
    prePassword: Yup.string()
        .required("Confirm Password is required")
        .min(4, "Password length should be at least 4 characters")
        .max(20, "Password cannot exceed more than 12 characters")
        .oneOf([Yup.ref("password")], "Passwords do not match")
    });

const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues
    } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema)
    });

const submitForm = (data) => {
    console.log(data);
    dispatch(addUser(data));
    reset();
    setFormTogge(!formToggle);
}
    
const editHandle = (e, val) => {
    e.preventDefault();
    const data = {
        id:e.currentTarget.id,
        name:val,
        active:true
    }
    dispatch(editUser(data));
}
const deleteHandle = (e, val) => {
    e.preventDefault();

    const data = {
        id:e.currentTarget.id,
        name:val+" deleted" + Date.toLocaleString(),
        active:false
    }
    dispatch(editUser(data));
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
                {...register('fullName', {
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
                {...register('username', {
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
                {...register('password', {
                    required:"To'ldirilishi shart!",
                })}
                required
                />
                <p className='alerts'>{errors.password?.message}</p>
                <label className='users__label' htmlFor='parol2-input'>Parolni tasdiqlang</label>
                <input 
                id='parol2-input'
                type="password"
                className='dashboard-input users-input'
                placeholder='Parol...'
                {...register('prePassword', {
                    required:"To'ldirilishi shart!",
                })}
                required
                />
                <p className='alerts'>{errors.password?.message}</p>
                <label className='users__label' htmlFor='division-select'>Boshqarma</label>
                <select 
                className='users__select' 
                id='division-select'
                defaultValue={'DEFAULT'}
                {...register("divisionId")}>
                    <option 
                    value={'DEFAULT'}
                    disabled 
                    hidden>Boshqarma tanlang...</option>
                    {
                    divisions ? divisions.filter((division)=>division.active===true).map((division, idx)=>(
                        <option 
                        className='division__list--item' 
                        key={division.id} 
                        value={division.id}
                        >
                                {division.name}
                        </option>
                    )) : <option>Server bilan aloqa yo'q</option>
                    }
                </select>
                <label className='users__label' htmlFor='role-select'>Foydalanuvchi turi</label>
                <select 
                className='users__select' 
                id='role-select'
                defaultValue={'DEFAULT'}
                {...register("roleId")}
                >
                    <option 
                    value={'DEFAULT'}
                    disabled 
                    hidden>Foydalanuvchi toifasini tanlang...</option>
                    {
                     roles ? roles.map((role, idx)=>(
                        <option 
                        className='division__list--item' 
                        key={role.id} 
                        value={role.id}>
                                {role.description}
                        </option>
                    )) : <option>Server bilan aloqa yo'q</option>
                    }
                </select>
                <button type='submit' className='dashboard-btn dashboard-btn--success'>QO'SHISH</button>
                <button type='button' className='dashboard-btn users-btn dashboard-btn--cancel' onClick={formToggeHandler}>BEKOR QILISH</button>
            </form>
            <hr className='dashboard__line'/>
            <table className=''>
                <thead>
                    <tr>
                        <th>F.I.Sh.</th>
                        <th>Boshqarma</th>
                        <th>Toifasi</th>
                        <th>Batafsil</th>
                    </tr>
                </thead>
                <tbody>                   
                {
                users.content ? users.content.map((user, idx)=>(
                    <tr className='' key={user.id}>
                        <td className=''>
                            {user.fullName}
                        </td>
                        <td>
                            <span>{user.division ? divisions.find((division)=>division.id===user.division.id).name  : '-'}</span>
                        </td>
                        <td>
                            <span>{user.role ? user.role.description : '-'}</span>
                        </td>
                        <td className='icons'>
                        <span 
                            className='edit-icon'
                            onClick={(e)=> editHandle(e, prompt())} 
                            id={user.id}
                            ><MdOutlineRemoveRedEye/>
                        </span>
                        </td>
                    </tr>
                )) : <tr><td>Server bilan aloqa yo'q</td></tr>}
                </tbody>
            </table>
        </div>
);
};

export default Users;