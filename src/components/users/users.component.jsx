import React, { useEffect, useState } from 'react';
import { MdDelete, MdOutlineRemoveRedEye } from 'react-icons/md';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, deleteUser, editUser, getRole, getRoles, getUsers } from '../../store/features/user/user.actions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import './users.styles.scss'
import { BsSearch } from 'react-icons/bs';





const Users = () => {
const [formToggle, setFormTogge] = useState(false)
const [create, setCreate] = useState(true)
const [userId, setUserId] = useState(null)

const dispatch = useDispatch()

const {userInfo, users, roles, role, loading} = useSelector(state => state.user)
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

const editHandle = (data) => {
    data.id=userId;
    dispatch(editUser(data));
    setFormTogge(!formToggle);
}



const editHandler = async (e) => {
    setUserId(e.currentTarget.id);
    const user = users.find(user=>user.id==e.currentTarget.id);
    reset({
        fullName:user.fullName,
        username:user.username,
        divisionId:user.division?.id,
        roleId:user.role.id
    });
    setFormTogge(true);
    setCreate(false);
}

const deleteHandle = (e) => {
    dispatch(deleteUser({id:e.currentTarget.id}));
}

const formToggeHandler = () => {
    setFormTogge(!formToggle);
    setCreate(true);
}


return (

        <div className='users'>
            <h4>Foydalanuvchilar</h4>
            <div className='users__header'>
                <div className='searchbox'>
                    <input className='searchbox__input' type='text' placeholder='Qidirish...'/>
                    <span className='searchbox__icon'><BsSearch/></span>
                </div>
                <div className='users__sort'>
                    <select className='users__select users__select--top'>
                        <option className='users__option'>Barchasi</option>
                        <option className='users__option'>Faol</option>
                        <option className='users__option'>Nofaol</option>
                    </select>  
                    <button className='dashboard-btn' onClick={formToggeHandler}>YARATISH</button>
                </div>                  
            </div>
            <form className={formToggle ? 'users__form' : 'form-toggle'} onSubmit={create? handleSubmit(submitForm) : handleSubmit(editHandle)}>
                <label className='users__label' htmlFor='fish-input'>F.I.Sh</label>
                <input 
                id='fish-input'
                type="text"
                autoComplete='off'
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
                autoComplete='off'
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
                autoComplete='off'
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
                autoComplete='off'
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
                    className='division__list--item' 
                    value={'DEFAULT'}
                    disabled 
                    hidden>Boshqarma tanlang...</option>
                    {
                    divisions?.filter((division)=>division.active===true).map((division, idx)=>(
                        <option 
                        className='division__list--item' 
                        key={division.id} 
                        value={division.id}
                        >
                                {division.name}
                        </option>
                    ))
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
                    className='division__list--item' 
                    value={'DEFAULT'}
                    disabled 
                    hidden>Foydalanuvchi toifasini tanlang...</option>
                    {
                     roles?.map((role, idx)=>(
                        <option 
                        className='division__list--item' 
                        key={role.id} 
                        value={role.id}>
                                {role.description}
                        </option>
                    ))}
                </select>
                <div className='users__btn'>
                <button type='submit' className='dashboard-btn  dashboard-btn--success'>{create ? "QO'SHISH" : "O'ZGARTIRISH"}</button>
                <button type='button' className='dashboard-btn  dashboard-btn--cancel' onClick={formToggeHandler}>BEKOR QILISH</button>
                </div>
            </form>
            <hr className='dashboard__line'/>
            <table className='users__table'>
                <thead className='users__table-header'>
                    <tr>
                        <th><input type='checkbox'/></th>
                        <th>F.I.Sh.</th>
                        <th>Boshqarma</th>
                        <th>Toifasi</th>
                        <th>Statusi</th>
                        <th>Harakatlar</th>
                    </tr>
                </thead>
                <tbody className='users__table-body'>                   
                {users?.map((user, idx)=>(
                    <tr className='' key={user?.id}>
                        <td><input type='checkbox'/></td>
                        <td className=''>
                            {user?.fullName}
                        </td>
                        <td>
                            <span>{user?.division ? divisions?.find((division)=>division?.id===user?.division.id)?.name  : '-'}</span>
                        </td>
                        <td>
                            <span>{user?.role ? user?.role?.description : '-'}</span>
                        </td>
                        <td>
                            <span>{user?.enabled ? 'AKTIV' : 'BLOKLANGAN'}</span>
                        </td>
                        <td className='icons'>
                        <span 
                            className='edit-icon'
                            id={user?.id}
                            onClick={(e)=> editHandler(e)} 
                            ><MdOutlineRemoveRedEye/>
                        </span>
                        <span className='delete-icon' id={user?.id} onClick={(e)=>deleteHandle(e)}><MdDelete/></span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
);
};

export default Users;