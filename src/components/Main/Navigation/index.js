import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navbar">
      <NavLink to="/home/new_survey" className="button navbar-button" activeClassName="navbar-button_active">
        Новый опрос
      </NavLink>
      <NavLink to="/home/my_surveys" className="button navbar-button" activeClassName="navbar-button_active">
        Мои опросы
      </NavLink>
      <NavLink to="#" className="button navbar-button" activeClassName="">
        Шаблоны опросов
      </NavLink>
      <NavLink to="/home/users" className="button navbar-button" activeClassName="navbar-button_active">
        Пользователи
      </NavLink>
    </nav>
  );
};

export default Navigation;
