import React from 'react';
import { Link } from 'react-router-dom/dist';
import css from './Home.module.scss';

const Home = () => {
  return (
    <div>
      <h1 className={css.title}>Hello</h1>
      <h2 className="animate__animated animate__fadeInDown">
        <span className={css.titletwo}>
          Please{' '}
          <Link to="/register">
            <span className={css.titlelink}>register</span>
          </Link>
        </span>
      </h2>
    </div>
  );
};

export default Home;
