import React from 'react';
import './AuthForm.css';
import { Link } from 'react-router-dom';
import Validation from '../../utils/Validation';
import FormLabel from './FormLabel/FormLabel';
import { EmailValidationRegexp } from '../../utils/constants';

const AuthForm = ({ isLoginForm, onLogin, onRegister, isSuccess, isLoading }) => {
  const { values, errors, isValid, handleChange } = Validation();

  const handleSubmit = (e) => {
    e.preventDefault();
    isLoginForm ? onLogin(values) : onRegister(values);
  };

  return (
    <form
      noValidate
      name={isLoginForm ? 'login' : 'register'}
      className='form'
      onSubmit={handleSubmit}
    >
      {!isLoginForm && (
        <FormLabel
          title='Имя'
          name='name'
          handleChange={handleChange}
          values={values.name}
          errors={errors}
          minLength={2}
          maxLength={30}
          isLoading={isLoading}
        />
      )}
      <FormLabel
        title='E-mail'
        name='email'
        handleChange={handleChange}
        values={values.email}
        errors={errors}
        pattern={EmailValidationRegexp}
        isLoading={isLoading}
      />
      <FormLabel
        title='Пароль'
        name='password'
        handleChange={handleChange}
        values={values.password}
        errors={errors}
        minLength={2}
        maxLength={30}
        isLoading={isLoading}
      />
      {!isSuccess && isLoginForm && <p className='form__error'>
        Что-то пошло не так...
      </p>}
      <button
        type='submit'
        className={`form__submit ${!isValid && 'form__submit_disabled'}  ${!isLoginForm && 'form__submit_login'}`}
        disabled={!isValid}
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

export default AuthForm;