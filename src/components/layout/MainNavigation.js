import classes from './MainNavigation.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}> Great Quotes</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/quotes" className={classes.active}>
              Quotes
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-quotes" className={classes.active}>
              New Quotes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
