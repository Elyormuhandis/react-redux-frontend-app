import { MdCancel, MdEdit, MdOutlinePersonOutline } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/features/user/user.slice';
import './header.styles.scss';
import {
  getUser,
  editSimpleUser,
} from '../../store/features/user/user.actions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import logoLight from '../../assets/logo-light.svg';
import logoGold from '../../assets/logo-gold.png';

const Header = () => {
  const [formToggle, setFormTogge] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);

  const dispatch = useDispatch();

  const { userRole, loading, userId, userInfo, userDivision } = useSelector(
    (state) => state.user
  );
  const { message, divisions } = useSelector((state) => state.division);

  const formSchema = Yup.object().shape({
    username: Yup.string().required('Ushbu maydon to`ldirilishi shart!'),
    passwordNow: Yup.string()
      .required('Ushbu maydon to`ldirilishi shart!')
      .min(8, 'Parol eng kam uzunligi 8ta belgi!')
      .max(20, 'Parol eng ko`p uzunligi 20ta belgi!'),
    password: Yup.string()
      .required('Ushbu maydon to`ldirilishi shart!')
      .min(8, 'Parol eng kam uzunligi 8ta belgi!')
      .max(20, 'Parol eng ko`p uzunligi 20ta belgi!'),
    prePassword: Yup.string()
      .required('Parolni tasdiqlanishi shart')
      .min(8, 'Parol eng kam uzunligi 8ta belgi bo`lsin!')
      .max(20, 'Parol eng ko`p uzunligi 20ta belgi bo`lsin!')
      .oneOf([Yup.ref('password')], 'Parollar mos emas!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    getValues,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(formSchema),
  });

  const editHandle = (data) => {
    console.log(data);
    dispatch(editSimpleUser(data));
    setFormTogge(!formToggle);
    reset();
  };

  const getUserHandler = () => {
    setModalToggle(true);
    dispatch(getUser(userId));
  };
  const editHandler = async (e) => {
    reset({
      username: userInfo.username,
    });
    setModalToggle(false);
    setFormTogge(true);
  };
  const formToggeHandler = () => {
    setFormTogge(!formToggle);
  };

  return (
    <header className='header'>
      <div className='header__icon'>
        <img src={logoLight} width='150rem' />
        {/* <img src={logoGold} width='150rem' /> */}
      </div>
      <div className='header__options'>
        <div className='searchbox'>
          <input className='searchbox__input' placeholder='Nima qidiramiz...' />
          <span className='searchbox__icon'>
            <BsSearch />
          </span>
        </div>
        <span onClick={getUserHandler} className='personal user-info'>
          <MdOutlinePersonOutline />
        </span>
        {
          <button className='personal' onClick={() => dispatch(logout())}>
            Logout
          </button>
        }
      </div>
      <div className={modalToggle ? 'user-info__modal' : 'hidden'}>
        <div className='user-info__modal--option'>
          <MdEdit
            className='user-info__modal--edit'
            onClick={(e) => editHandler(e)}
          />
          <MdCancel
            onClick={() => setModalToggle(false)}
            className='user-info__modal--cancel'
          />
        </div>
        <h4 style={{ marginBottom: '1rem' }}>Foydalanuvchi haqida ma'lumot</h4>
        <p>{`1. F.I.Sh: ${userInfo?.fullName}`}</p>
        <p>{`2. Login: ${userInfo?.username}`}</p>
        <p>{`3. Boshqarma: ${userInfo?.division?.name || 'ADMIN'}`}</p>
        <p>{`4. Toifasi: ${userInfo?.role.description}`}</p>
        <p>{`5. Holati: ${userInfo?.enabled ? 'AKTIV' : 'NOAKTIV'}`}</p>
        <p>{`6. Yaratilgan: ${userInfo?.createdAt
          .replace('T', ', ')
          .slice(0, 17)}`}</p>
      </div>

      <div className={formToggle ? 'user-edit__modal' : 'hidden'}>
        <form
          className={formToggle ? 'user-edit__form' : 'hidden'}
          onSubmit={handleSubmit(editHandle)}>
          <label className='user-edit__label' htmlFor='login-input'>
            Login kiriting
          </label>
          <input
            id='login-input'
            type='text'
            autoComplete='off'
            className='user-edit__input'
            placeholder='Login...'
            {...register('username', {
              required: "To'ldirilishi shart!",
            })}
            required
          />
          <p className={errors.username ? 'alerts' : 'alerts v-hidden'}>
            {errors.username?.message}
          </p>
          <label className='users__label' htmlFor='passwordNow-input'>
            Joriy parolni kiriting
          </label>
          <input
            id='passwordNow-input'
            type='password'
            className='user-edit__input'
            autoComplete='off'
            placeholder='Parol...'
            {...register('passwordNow', {
              required: "To'ldirilishi shart!",
            })}
            required
          />
          <p className={errors.passwordNow ? 'alerts' : 'alerts v-hidden'}>
            {errors.passwordNow?.message}
          </p>
          <label className='users__label' htmlFor='password-input'>
            Yangi parolni kiriting
          </label>
          <input
            id='password-input'
            type='password'
            className='user-edit__input'
            autoComplete='off'
            placeholder='Parol...'
            {...register('password', {
              required: "To'ldirilishi shart!",
            })}
            required
          />
          <p className={errors.password ? 'alerts' : 'alerts v-hidden'}>
            {errors.password?.message}
          </p>
          <label className='user-edit__label' htmlFor='prePassword-input'>
            Yangi parolni tasdiqlang
          </label>
          <input
            id='prePassword-input'
            type='password'
            autoComplete='off'
            className='user-edit__input'
            placeholder='Parol...'
            {...register('prePassword', {
              required: "To'ldirilishi shart!",
            })}
            required
          />
          <p className={errors.prePassword ? 'alerts' : 'alerts v-hidden'}>
            {errors.prePassword?.message}
          </p>
          <div className='user-edit__btns'>
            <button type='submit' className='user-edit__ebtn'>
              O'ZGARTIRISH
            </button>
            <button
              type='button'
              className='user-edit__cbtn'
              onClick={formToggeHandler}>
              BEKOR QILISH
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
