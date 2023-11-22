import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';

const Login = ({ onLogin, onRegister }) => {
  const navigate = useNavigate();
  
  return (
    <main className='login'>
      <a
        className='login__logo'
        onClick={() => navigate('/')}
      ></a>
      <h2 className='login__title'>Рады видеть!</h2>
      <AuthForm isLoginForm={true} onLogin={onLogin} onRegister={onRegister} />
    </main>
  );
};

export default Login;