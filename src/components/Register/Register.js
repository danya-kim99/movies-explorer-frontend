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
      <h2 className='register__title'>Добро пожаловать!</h2>
      <AuthForm isLoginForm={false} onLogin={onLogin} onRegister={onRegister} />
    </main>
  );
};

export default Register;