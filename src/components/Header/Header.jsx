/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = props => {
  const linkTo = props.isAuthenticated ? '/home' : '/login';
  const linkText = props.isAuthenticated ? 'Привет, admin' : 'Вход';
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
