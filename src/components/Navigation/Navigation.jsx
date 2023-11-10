import UsrMenu from 'components/UserMenu/UsrMenu';
import { NavLink } from 'react-router-dom';
import * as routes from 'utils/routes';
import css from './Navigation.module.scss';
import { selectIsSignedIn } from 'redux/selectors';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const isSignedIn = useSelector(selectIsSignedIn);

  return (
    <div className={css.navigation}>
      {isSignedIn ? (
        <>
          <NavLink to={routes.CONTACTS_ROUTE} className={css.navlink}>
            Contacts
          </NavLink>
          <UsrMenu />
        </>
      ) : (
        <>
          <NavLink to={routes.HOME_ROUTE} className={css.navlink}>
            Home
          </NavLink>

          <NavLink to={routes.LOGIN_ROUTE} className={css.navlink}>
            Login
          </NavLink>
          <NavLink to={routes.REGISTER_ROUTE} className={css.navlink}>
            Register
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Navigation;
