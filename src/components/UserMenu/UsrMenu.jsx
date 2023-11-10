import React from 'react';
import css from './UserMenu.module.scss';
import { logoutThunk } from 'redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from 'redux/selectors';

const UsrMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);

  const handleLogout = () => {
    dispatch(logoutThunk());
  };
  return (
    <div>
      <span className={css.user}>Hello, {user.name}</span>
      <button type="button" onClick={handleLogout} className={css.logout}>
        LogOut
      </button>
    </div>
  );
};

export default UsrMenu;
