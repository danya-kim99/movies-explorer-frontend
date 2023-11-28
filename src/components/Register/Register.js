import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import AuthForm from '../AuthForm/AuthForm';

const Register = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();

  return (
    <main className='register'>
      <a
        className='register__logo'
        onClick={() => navigate('/')}
      ></a>
      <h1 className='register__title'>Добро пожаловать!</h1>
      <AuthForm isLoginForm={false} onLogin={onLogin} onRegister={onRegister} />
    </main>
  );
};

export default Register;