import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './SearchForm.css';

function SearchForm({
  handleSearchMoviesFilms,
  handleShortFilmToggle,
  isShortFilm,
}) {

  const [isQueryError, setIsQueryError] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  const handleChangeInputQuery = (e) => {
    setQuery(e.target.value);
  }

  const setShortFilmToggle = () => {
    setQuery(query);
    handleShortFilmToggle(query);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length === 0) {
      setIsQueryError(true);
    } else {
      setIsQueryError(false);
      handleSearchMoviesFilms(query);
    }
  }

  useEffect(() => {
    if (
      location.pathname === "/movies" &&
      localStorage.getItem("movieSearch")
    ) {
      const localQuery = localStorage.getItem("movieSearch");
      setQuery(localQuery);
    } else {
      setQuery('')
    }
  }, [location]);

  return (
    <section className='search-form'>
      <form noValidate className='search-form__all' onSubmit={handleFormSubmit} >
        <input
          type='text'
          placeholder='Фильм'
          id='search-movie'
          className='search-form__input'
          required
          onChange={handleChangeInputQuery}
          value={query || ""}
        />
        <button type="submit" className='search-form__button'></button>
      </form>
      {isQueryError && <p className='search-form__error'>Нужно ввести ключевое слово</p>}
      <label className='search-form__filter'>
        <input
          type='checkbox'
          className='search-form__tumbler'
          checked={isShortFilm}
          onChange={setShortFilmToggle}
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
