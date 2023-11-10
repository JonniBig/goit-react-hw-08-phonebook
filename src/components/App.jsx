import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Suspense, lazy, useEffect } from 'react';
import { refreshThunk } from 'redux/authSlice';
import { Toaster } from 'react-hot-toast';
import RestrictedRoute from './RestrictedRoute';
import PrivateRoute from './PrivateRoute';
import Navigation from './Navigation/Navigation';
import * as routes from 'utils/routes';
const Contacts = lazy(() => import('pages/Contacts/Contacts'));
const Login = lazy(() => import('pages/Login/Login'));
const Register = lazy(() => import('pages/Register/Register'));
const Home = lazy(() => import('pages/Home/Home'));

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    <div>
      <header>
        <Navigation />
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
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: '#7fcbea',
            },
          },
          error: {
            style: {
              background: '#FFCF5B',
            },
          },
        }}
      />
    </div>
  );
};
