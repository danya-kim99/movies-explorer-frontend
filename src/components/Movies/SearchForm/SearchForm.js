import React, { useState } from 'react';
import './SearchForm.css';

function SearchForm() {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <section className='search-form'>
      <form className='search-form__all'>
        <input
          type='text'
          placeholder='Фильм'
          className='search-form__input'
          required
        />
        <button type="submit" className='search-form__button'></button>
      </form>
      <label className='search-form__filter'>
        <input
          type='checkbox'
          className='search-form__tumbler'
          checked={checked}
          onChange={handleChange}
        />
        <span
          className='search-form__tumbler-visible'
          hidden
        ></span>
        <p className='search-form__filter-name'>Короткометражки</p>
      </label>
    </section>
  );
}

export default SearchForm;
