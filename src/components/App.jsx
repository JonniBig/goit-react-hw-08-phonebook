import { NavLink, Route, Routes } from 'react-router-dom';
import css from './App.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, lazy, useEffect } from 'react';
import { logoutThunk, refreshThunk } from 'redux/authSlice';
import { selectIsSignedIn, selectUserData } from 'redux/selectors';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';
import * as routes from 'utils/routes';
const Contacts = lazy(() => import('pages/Contacts/Contacts'));
const Login = lazy(() => import('pages/Login/Login'));
const Register = lazy(() => import('pages/Register/Register'));
const Home = lazy(() => import('pages/Home/Home'));

export const App = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectIsSignedIn);
  const user = useSelector(selectUserData);
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);
  const handleLogout = () => {
    dispatch(logoutThunk());
  };

  return (
    <div>
      <header className={css.header}>
        <NavLink to={routes.HOME_ROUTE} className={css.navlink}>
          Home
        </NavLink>
        {isSignedIn ? (
          <>
            <NavLink to={routes.CONTACTS_ROUTE} className={css.navlink}>
              Contacts
            </NavLink>
            <span>Hello, {user.name}</span>
            <button type="button" onClick={handleLogout} className={css.logout}>
              LogOut
            </button>
          </>
        ) : (
          <>
            <NavLink to={routes.LOGIN_ROUTE} className={css.navlink}>
              Login
            </NavLink>
            <NavLink to={routes.REGISTER_ROUTE} className={css.navlink}>
              Regiser
            </NavLink>
          </>
        )}
      </header>
      <main>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={routes.HOME_ROUTE} element={<Home />} />
            <Route
              path={routes.CONTACTS_ROUTE}
              element={
                <PrivateRoute>
                  <Contacts />
                </PrivateRoute>
              }
            />
            <Route
              path={routes.LOGIN_ROUTE}
              element={
                <RestrictedRoute>
                  <Login />
                </RestrictedRoute>
              }
            />
            <Route
              path={routes.REGISTER_ROUTE}
              element={
                <RestrictedRoute>
                  <Register />
                </RestrictedRoute>
              }
            />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};
