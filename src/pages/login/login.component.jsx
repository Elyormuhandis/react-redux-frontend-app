import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/features/user/user.actions";
import { useEffect } from "react";
import {
  LoginStyle,
  LoginContainerStyle,
  FromStyle,
  FromControlStyle,
  BtnStyle,
  ErrorMessage,
  InputLabel,
  ErrorAuth,
} from "./login.styles.jsx";
import { PropagateLoader } from "react-spinners";

const Login = () => {
  const { loading, userToken, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
  });
  const override = {
    textAlign: "center",
    marginRight: "50px",
  };
  // redirect authenticated user to profile screen
  useEffect(() => {
    if (userToken) {
      navigate(fromPage);
    }
  }, [fromPage, navigate, userToken]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <LoginStyle className='login-style'>
      <LoginContainerStyle>
        <FromStyle onClick={handleSubmit(submitForm)}>
          <InputLabel>
            <FromControlStyle
              autoComplete='off'
              placeholder='Login kiriting...'
              {...register("username", {
                required: true,
                minLength: {
                  value: 4,
                  message: "Belgilar soni 4 tadan kam!",
                },
              })}
              required
            />
            {errors.username && (
              <ErrorMessage className='error username_error'>
                {errors.username.message}
              </ErrorMessage>
            )}
          </InputLabel>
          <InputLabel>
            <FromControlStyle
              placeholder='Parol kiriting...'
              type='password'
              {...register("password", {
                required: true,
                minLength: {
                  value: 4,
                  message: "Belgilar soni 4 tadan kam!",
                },
              })}
              required
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </InputLabel>
          <BtnStyle type='submit' disabled={!isValid}>
            KIRISH
          </BtnStyle>
          <PropagateLoader
            cssOverride={override}
            loading={loading}
            size={15}
            color='green'
          />
          {error ? <ErrorAuth>Login yoki parol xato</ErrorAuth> : ""}
        </FromStyle>
      </LoginContainerStyle>
    </LoginStyle>
  );
};

export default Login;
