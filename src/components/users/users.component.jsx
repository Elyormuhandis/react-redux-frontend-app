import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit, MdOutlineRemoveRedEye } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  editUser,
} from "../../store/features/user/user.actions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./users.styles.scss";
import { BsSearch } from "react-icons/bs";

const Users = () => {
  const { users, roles, message } = useSelector((state) => state.user);
  const { mode } = useSelector((state) => state.ui);
  const [formToggle, setFormTogge] = useState(false);
  const [create, setCreate] = useState(true);
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();

  const [filteredUsers, setFilteredUsers] = useState(users);
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const { divisions } = useSelector((state) => state.division);

  const formSchema = Yup.object().shape({
    fullName: Yup.string().required("Ushbu maydon to`ldirilishi shart!"),
    username: Yup.string().required("Ushbu maydon to`ldirilishi shart!"),
    password: Yup.string()
      .required("Ushbu maydon to`ldirilishi shart!")
      .min(8, "Parol uzunligi 8tadan kam")
      .test(
        "isValidPass",
        "Parol uzunligi 8tadan kam va katta harf, belgi, raqamlardan iborat emas!",
        (value, context) => {
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSymbole = /[!@#%&]/.test(value);
          let validConditions = 0;
          const numberOfMustBeValidConditions = 3;
          const conditions = [
            hasLowerCase,
            hasUpperCase,
            hasNumber,
            hasSymbole,
          ];
          conditions.forEach((condition) =>
            condition ? validConditions++ : null
          );
          if (validConditions === numberOfMustBeValidConditions) {
            return true;
          }
          return false;
        }
      ),
    prePassword: Yup.string()
      .required("Parolni tasdiqlanishi shart")
      .min(8, "Parol uzunligi 8tadan kam")
      .test(
        "isValidPass",
        "Parol uzunligi 8tadan kam va katta harf, belgi, raqamlardan iborat emas!",
        (value, context) => {
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSymbole = /[!@#%&]/.test(value);
          let validConditions = 0;
          const numberOfMustBeValidConditions = 3;
          const conditions = [
            hasLowerCase,
            hasUpperCase,
            hasNumber,
            hasSymbole,
          ];
          conditions.forEach((condition) =>
            condition ? validConditions++ : null
          );
          if (validConditions === numberOfMustBeValidConditions) {
            return true;
          }
          return false;
        }
      )
      .oneOf([Yup.ref("password")], "Parollar mos emas!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(formSchema),
  });

  const submitForm = (data) => {
    dispatch(addUser(data));
    reset();
    setFormTogge(!formToggle);
  };

  const editHandle = (data) => {
    data.id = userId;
    dispatch(editUser(data));
    setFormTogge(!formToggle);
  };

  const editHandler = async (e) => {
    setUserId(e.currentTarget.id);
    const user = users.find((user) => user.id === e.currentTarget.id);
    reset({
      fullName: user.fullName,
      username: user.username,
      divisionId: user.division?.id,
      roleId: user.role.id,
    });
    setFormTogge(true);
    setCreate(false);
  };

  const deleteHandle = (e) => {
    dispatch(deleteUser({ id: e.currentTarget.id }));
  };

  const formToggeHandler = () => {
    setFormTogge(!formToggle);
    setCreate(true);
  };

  return (
    <div
      className='users'
      style={mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }}
    >
      <h4>Foydalanuvchilar</h4>
      <div className='users__header'>
        <div className='searchbox'>
          <input
            className='searchbox__input'
            type='text'
            placeholder='Qidirish...'
            onChange={(e) => {
              setFilteredUsers(
                users.filter((user) =>
                  user.fullName.toLowerCase().includes(e.target.value)
                )
              );
            }}
          />
          <span className='searchbox__icon'>
            <BsSearch />
          </span>
        </div>
        {message && <div style={{ color: "orangered" }}>{message}</div>}
        <div className='users__sort'>
          <select
            className='users__select users__select--top'
            style={mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }}
          >
            <option
              style={
                mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
              }
              className='users__option'
            >
              Barchasi
            </option>
            <option
              style={
                mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
              }
              className='users__option'
            >
              Faol
            </option>
            <option
              style={
                mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
              }
              className='users__option'
            >
              Nofaol
            </option>
          </select>
          <button
            className='dashboard-btn'
            style={
              mode
                ? {}
                : {
                    backgroundColor: "#fff",
                    color: "#0b2b26cc",
                    borderColor: "#0b0b0b",
                  }
            }
            onClick={formToggeHandler}
          >
            YARATISH
          </button>
        </div>
      </div>
      <form
        style={mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }}
        className={formToggle ? "users__form" : "form-toggle"}
        onSubmit={create ? handleSubmit(submitForm) : handleSubmit(editHandle)}
      >
        <label className='users__label' htmlFor='fish-input'>
          F.I.Sh
        </label>
        <input
          id='fish-input'
          type='text'
          autoComplete='off'
          className='dashboard-input users-input'
          placeholder='Ism sharifingiz...'
          {...register("fullName", {
            required: "To'ldirilishi shart!",
          })}
          required
        />
        <label className='users__label' htmlFor='login-input'>
          Login kiriting
        </label>
        <input
          id='login-input'
          type='text'
          autoComplete='off'
          className='dashboard-input users-input'
          placeholder='Login...'
          {...register("username", {
            required: "To'ldirilishi shart!",
          })}
          required
        />
        <label className='users__label' htmlFor='parol-input'>
          Parol kiriting
        </label>
        <input
          id='parol-input'
          type='password'
          className='dashboard-input users-input'
          autoComplete='off'
          placeholder='Parol...'
          {...register("password", {
            required: "To'ldirilishi shart!",
          })}
          required
        />
        <p className='alerts'>{errors.password?.message}</p>
        <label className='users__label' htmlFor='parol2-input'>
          Parolni tasdiqlang
        </label>
        <input
          id='parol2-input'
          type='password'
          autoComplete='off'
          className='dashboard-input users-input'
          placeholder='Parol...'
          {...register("prePassword", {
            required: "To'ldirilishi shart!",
          })}
          required
        />
        <p className='alerts'>{errors.prePassword?.message}</p>
        <label className='users__label' htmlFor='division-select'>
          Boshqarma
        </label>
        <select
          className='users__select'
          id='division-select'
          defaultValue={"DEFAULT"}
          {...register("divisionId")}
        >
          <option
            className='division__list--item'
            value={"DEFAULT"}
            disabled
            hidden
          >
            Boshqarma tanlang...
          </option>
          {divisions
            ?.filter((division) => division.active === true)
            .map((division, idx) => (
              <option
                className='division__list--item'
                key={division.id}
                value={division.id}
              >
                {division.name}
              </option>
            ))}
        </select>
        <label className='users__label' htmlFor='role-select'>
          Foydalanuvchi turi
        </label>
        <select
          className='users__select'
          id='role-select'
          defaultValue={"DEFAULT"}
          {...register("roleId")}
        >
          <option
            className='division__list--item'
            value={"DEFAULT"}
            disabled
            hidden
          >
            Foydalanuvchi toifasini tanlang...
          </option>
          {roles?.map((role, idx) => (
            <option
              className='division__list--item'
              key={role.id}
              value={role.id}
            >
              {role.description}
            </option>
          ))}
        </select>
        <div className='users__btn'>
          <button
            type='submit'
            className='dashboard-btn  dashboard-btn--success'
          >
            {create ? "QO'SHISH" : "O'ZGARTIRISH"}
          </button>
          <button
            type='button'
            className='dashboard-btn  dashboard-btn--cancel'
            onClick={formToggeHandler}
          >
            BEKOR QILISH
          </button>
        </div>
      </form>
      <hr className='dashboard__line' />
      <table className='users__table'>
        <thead className='users__table-header'>
          <tr>
            <th
              style={
                mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
              }
            >
              N
            </th>
            <th
              style={
                mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
              }
            >
              F.I.Sh.
            </th>
            <th
              style={
                mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
              }
            >
              Login
            </th>
            <th
              style={
                mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
              }
            >
              Boshqarma
            </th>
            <th
              style={
                mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
              }
            >
              Toifasi
            </th>
            <th
              style={
                mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
              }
            >
              Statusi
            </th>
            <th
              style={
                mode
                  ? {}
                  : {
                      backgroundColor: "#fff",
                      color: "#0b2b26cc",
                      textAlign: "center",
                    }
              }
            >
              O'zgartirish
            </th>
            <th
              style={
                mode
                  ? {}
                  : {
                      backgroundColor: "#fff",
                      color: "#0b2b26cc",
                      textAlign: "center",
                    }
              }
            >
              O'chirish
            </th>
          </tr>
        </thead>
        <tbody className='users__table-body'>
          {filteredUsers?.map((user, idx) => (
            <tr key={user?.id}>
              <td
                style={
                  mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                {idx + 1 + "."}
              </td>
              <td
                style={
                  mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                {user?.fullName}
              </td>
              <td
                style={
                  mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                {user?.username}
              </td>
              <td
                style={
                  mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                <span>
                  {user?.division
                    ? divisions?.find(
                        (division) => division?.id === user?.division.id
                      )?.name
                    : "-"}
                </span>
              </td>
              <td
                style={
                  mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                <span>{user?.role ? user?.role?.description : "-"}</span>
              </td>
              <td
                style={
                  mode ? {} : { backgroundColor: "#fff", color: "#0b2b26cc" }
                }
              >
                <span>{user?.enabled ? "AKTIV" : "BLOKLANGAN"}</span>
              </td>
              <td
                style={
                  mode
                    ? {}
                    : {
                        textAlign: "center",
                        backgroundColor: "#fff",
                        color: "#0b2b26cc",
                      }
                }
              >
                <MdEdit
                  className='ed-icon'
                  id={user?.id}
                  onClick={(e) => editHandler(e)}
                />
              </td>
              <td
                style={
                  mode
                    ? {}
                    : {
                        textAlign: "center",
                        backgroundColor: "#fff",
                        color: "#0b2b26cc",
                      }
                }
              >
                <MdDelete
                  className='del-icon'
                  id={user?.id}
                  onClick={(e) => deleteHandle(e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
