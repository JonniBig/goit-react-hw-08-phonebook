import React from 'react';
import { Link } from 'react-router-dom/dist';
import css from './Home.module.scss';

const Home = () => {
  return (
    <div>
      <h1 className={css.title}>Hello</h1>
      <h2 className="animate__animated animate__fadeInDown">
        <span className={css.titletwo}>
          Please
          <Link to="/login">
            <span className={css.titlelink}> login </span>
          </Link>
          or
          <Link to="/register">
            <span className={css.titlelink}> register </span>
          </Link>
          if you want to manage contacts.
        </span>
      </h2>
    </div>
  );
};

export default Home;
