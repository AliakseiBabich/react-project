/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = props => {
  const switchEnterTitle = () => {
    if (!props.isAuthenticated) {
      return (
        <NavLink
          to="/login"
          className="navlink"
          activeClassName="navlink_active"
        >
          Вход
        </NavLink>
      );
    } else {
      return (
        <NavLink
          to="/home"
          className="navlink"
          activeClassName="navlink_active"
        >
          Привет, admin
        </NavLink>
      );
    }
  };
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
        {switchEnterTitle()}
      </nav>
    </header>
  );
};

export default Header;
