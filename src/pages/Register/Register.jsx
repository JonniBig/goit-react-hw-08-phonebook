import React from 'react';
import { useDispatch } from 'react-redux';
import { registerThunk } from 'redux/authSlice';
import css from '../Login/Login.module.scss';

const Register = () => {
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    const name = e.currentTarget.elements.name.value;
    const email = e.currentTarget.elements.email.value;
    const password = e.currentTarget.elements.password.value;
    console.log(name, email, password);
    const formData = { name, email, password };
    dispatch(registerThunk(formData));
    e.currentTarget.reset();
  };
  return (
    <div className={css.login}>
      <div className={css.section}>
        <h1>Register</h1>
        <form onSubmit={onSubmit} className={css.form}>
          <label>
            <input type="text" name="name" placeholder="Name" />
          </label>
          <label>
            <input type="email" name="email" placeholder="Email" />
          </label>
          <label>
            <input type="password" name="password" placeholder="Password" />
          </label>
          <button type="submit" className={css.btn}>
            Sign UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
