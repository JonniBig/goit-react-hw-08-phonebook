import React from 'react';
import { useDispatch } from 'react-redux';
import { loginThunk } from 'redux/authSlice';
import css from './Login.module.scss';

const Login = () => {
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;
    const formData = { email, password };
    dispatch(loginThunk(formData));
    e.currentTarget.reset();
  };
  return (
    <div className={css.login}>
      <div className={css.section}>
        <h1>Login</h1>
        <form onSubmit={onSubmit} className={css.form}>
          <label>
            <input type="email" name="email" placeholder="Email" />
          </label>
          <label>
            <input type="password" name="password" placeholder="Password" />
          </label>
          <button type="submit" className={css.btn}>
            Sign IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
