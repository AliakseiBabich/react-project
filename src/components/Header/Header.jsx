/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = props => {
  const logged = props.logged;
  const userLogged = props.logged?.user;
  console.log(logged);
  console.log(userLogged);

  const linkTo = logged
    ? userLogged?.role === 'admin'
      ? '/home'
      : '/home/my_surveys'
    : '/login';
  const linkText = logged
    ? userLogged?.role === 'admin'
      ? `Привет, ${userLogged.role}`
      : `Привет, ${userLogged.firstname}`
    : 'Вход';
  return (
    <header className="header">
      <NavLink exact={true} to="/" className="header-logo">
        <h1>
          <span>:i</span>
          <span className="header-logo-center">Tech</span>
          <span>Art</span>
        </h1>
      </NavLink>
      <nav className="header-nav">
        <NavLink
          exact={true}
          to="/about"
          className="navlink"
          activeClassName="navlink_active"
        >
          О компании
        </NavLink>
        <NavLink
          to={linkTo}
          className="navlink"
          activeClassName="navlink_active"
        >
          {linkText}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
