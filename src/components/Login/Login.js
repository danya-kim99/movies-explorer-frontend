import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';
import './Login.css';
import AuthForm from '../AuthForm/AuthForm';

const Login = ({ onLogin, isLoggedIn, isSuccess }) => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    onLogin(values)
  }

  return (
    isLoggedIn ? <Navigate to="/" replace/> : 
    <main className='login'>
      <a
        className='login__logo'
        onClick={() => navigate('/')}
      ></a>
      <h1 className='login__title'>Рады видеть!</h1>
      <AuthForm isLoginForm={true} onLogin={handleSubmit} isSuccess={isSuccess}/>
    </main>
  );
};

export default Login;