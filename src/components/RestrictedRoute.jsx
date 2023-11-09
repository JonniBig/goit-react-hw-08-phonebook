import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsSignedIn } from 'redux/selectors';
import * as routes from 'utils/routes';

const RestrictedRoute = ({ children }) => {
  const isSignedIn = useSelector(selectIsSignedIn);
  return isSignedIn ? <Navigate to={routes.CONTACTS_ROUTE} /> : children;
};

export default RestrictedRoute;
