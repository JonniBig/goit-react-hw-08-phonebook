import { NavLink, Route, Routes } from 'react-router-dom';
import css from './App.module.scss';
import Contacts from 'pages/Contacts/Contacts';
import Login from 'pages/Login/Login';
import Register from 'pages/Register/Register';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { refreshThunk } from 'redux/authSlice';
import { selectIsSignedIn } from 'redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectIsSignedIn);
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <div>
      <header className={css.header}>
        {isSignedIn ? (
          <>
            <NavLink to={'/contacts'} className={css.navlink}>
              Contacts
            </NavLink>
            <button type="button" className={css.logout}>
              LogOut
            </button>
          </>
        ) : (
          <>
            <NavLink to={'/login'} className={css.navlink}>
              Login
            </NavLink>
            <NavLink to={'/register'} className={css.navlink}>
              Regiser
            </NavLink>
          </>
        )}
      </header>
      <main>
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
};
