import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = props => {
  const userLogged = props.logged?.user;

  if (userLogged?.role === 'admin') {
    return (
      <nav className="navbar">
        <NavLink
          to="/home/new_survey"
          className="button navbar-button"
          activeClassName="navbar-button_active"
        >
          Новый опрос
        </NavLink>
        <NavLink
          to="/home/my_surveys"
          className="button navbar-button"
          activeClassName="navbar-button_active"
        >
          Мои опросы
        </NavLink>
        <NavLink
          to="/home/drafts"
          className="button navbar-button"
          activeClassName="navbar-button_active"
        >
          Шаблоны опросов
        </NavLink>
        <NavLink
          to="/home/users"
          className="button navbar-button"
          activeClassName="navbar-button_active"
        >
          Пользователи
        </NavLink>
      </nav>
    );
  }
  return (
    <nav className="navbar">
      <NavLink
        to="/home/my_surveys"
        className="button navbar-button"
        activeClassName="navbar-button_active"
      >
        Мои опросы
      </NavLink>
    </nav>
  );
};

export default Navigation;
