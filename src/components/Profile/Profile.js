import React, { useState, useContext, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import Validation from '../../utils/Validation';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({
  handleUpdateUserInfo,
  isFormSubmitting,
  handleSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, isValid, handleChange, setValues } = Validation({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [serverResError, setServerResError] = useState(false);
  const [isShowSaveButton, setShowSaveButton] = useState(false);

  const handleEditButtonClick = () => {
    setShowSaveButton(true);
  };

  useEffect(() => {
    setValues({
      ...values,
      name: currentUser.name || "",
      email: currentUser.email || "",
    });
  }, [currentUser, setValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      handleUpdateUserInfo(values);
      console.log(values)
    } else {
      setServerResError(true);
    }
  };

  return (
    <>
      <Header />
      <main className='profile'>
        <h1 className='profile__name'>Привет, {currentUser.name}!</h1>
        <form
          name='profile'
          className='profile__form'
          onSubmit={handleSubmit}
        >
          <label className='profile__label'>
            <span className='profile__input-title'>Имя</span>
            <input
              className='profile__input'
              type='text'
              name='name'
              onChange={handleChange}
              onFocus={handleEditButtonClick}
              value={values.name}
              minLength={2}
              maxLength={30}
              required
              placeholder='Ваше имя'
              disabled={isFormSubmitting}
            />
          </label>
          <span className='profile__span-error'>{errors.name}</span>
          <label className='profile__label'>
            <span className='profile__input-title'>E-mail</span>
            <input
              className='profile__input'
              pattern={"[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\\.[a-z]{2,}"}
              type='email'
              name='email'
              onChange={handleChange}
              onFocus={handleEditButtonClick}
              value={values.email}
              required
              placeholder='Ваш E-mail'
              disabled={isFormSubmitting}
            />
          </label>
          <span className='profile__span-error'>{errors.email}</span>
          <p className='profile__error'>
            {serverResError && 'При обновлении профиля произошла ошибка.'}
          </p>
          {isShowSaveButton ? (
            <button
              type='submit'
              className='profile__button profile__button_submit'
            >
              Сохранить
            </button>
          ) : (
            <>
              <button
                type='button'
                className='profile__button'
                onClick={handleEditButtonClick}
              >
                Редактировать
              </button>
              <button
                type='button'
                className='profile__button profile__button_logout'
                onClick={() => handleSignOut()}
              >
                Выйти из аккаунта
              </button>
            </>
          )}
        </form>
      </main>
    </>
  );
};

export default Profile;