import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';
import './Register.css';
import AuthForm from '../AuthForm/AuthForm';

const Register = ({ onRegister, isLoggedIn, isSuccess }) => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    onRegister(values)
  }

  return (
    isLoggedIn ? <Navigate to="/" replace/> : 
    <main className='register'>
      <a
        className='register__logo'
        onClick={() => navigate('/')}
      ></a>
      <h1 className='register__title'>Добро пожаловать!</h1>
      <AuthForm isLoginForm={false} onRegister={handleSubmit} isSuccess={isSuccess}/>
    </main>
  );
};

export default Register;