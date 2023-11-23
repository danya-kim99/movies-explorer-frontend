import React from 'react';
import './AuthForm.css';
import { Link } from 'react-router-dom';
import Validation from '../../utils/Validation';
import FormLabel from './FormLabel/FormLabel';

const Auth = ({ isLoginForm, onLogin, onRegister }) => {
  const { values, errors, isValid, handleChange, resetForm } = Validation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    resetForm();
    isLoginForm ? onLogin() : onRegister();
  };

  return (
    <form
      name={isLoginForm ? 'login' : 'register'}
      className='form'
      onSubmit={handleSubmit}
    >
      {!isLoginForm && (
        <FormLabel
          title='Имя'
          name='name'
          handleChange={handleChange}
          values={values}
          errors={errors}
          minLength={2}
          maxLength={30}
        />
      )}
      <FormLabel
        title='E-mail'
        name='email'
        handleChange={handleChange}
        values={values}
        errors={errors}
      />
      <FormLabel
        title='Пароль'
        name='password'
        handleChange={handleChange}
        values={values}
        errors={errors}
        minLength={2}
        maxLength={30}
      />
      {false && <p className='form__error'> //заглушка
        Что-то пошло не так...
      </p>}
      <button
        type='submit'
        className={`form__submit ${!isValid && 'form__submit_disabled'}  ${!isLoginForm && 'form__submit_login'}`}
      >
        {isLoginForm ? 'Войти' : 'Зарегистрироваться'}
      </button>
      <p className='form__link-caption'>
        {!isLoginForm ? (
          <>
            Уже зарегистрированы?
            <Link
              to='/signin'
              className='form__link'
            >
              Войти
            </Link>
          </>
        ) : (
          <>
            Еще не зарегистрированы?
            <Link
              to='/signup'
              className='form__link'
            >
              Регистрация
            </Link>
          </>
        )}
      </p>
    </form>
  );
};

export default Auth;