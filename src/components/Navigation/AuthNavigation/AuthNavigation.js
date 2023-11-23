import React from 'react';
import './AuthNavigation.css';
import { Link } from 'react-router-dom';

const AuthNavigation = () => {
  return (
    <nav className='auth-navigation-buttons'>
      <ul className='auth-navigation-buttons__content'>
        <li><Link className='auth-navigation-buttons__link auth-navigation-buttons__link_register' to='/signup'>Регистрация</Link></li>
        <li><Link className='auth-navigation-buttons__link auth-navigation-buttons__link_login' to='/signin'>Войти</Link></li>
      </ul>
    </nav>
  );
};

export default AuthNavigation;