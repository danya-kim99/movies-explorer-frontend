import React, { useEffect, useState } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from './SearchForm/SearchForm';
import './Movies.css';
import { moviesApi } from '../../utils/MoviesApi';
import { filterMovies, filterDuration } from "../../utils/filterMovies";

function Movies({
  savedMovies,
  isLoggedIn,
  handleDeleteMovie,
  handleSaveMovie, }) {

  const [isLoading, setIsLoading] = useState(false);
  const [isShortFilm, setIsShortFilm] = useState(localStorage.getItem("isShortFilm") ? JSON.parse(localStorage.getItem("isShortFilm")) : false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSearchHappened, setIsSearchHappened] = useState(false);

  const handleUpdateFilteredMovies = (movies, query, short) => {
    const moviesCardList = filterMovies(movies, query, short);

    setFilteredMovies(short ? filterDuration(moviesCardList) : moviesCardList);
    setIsSearchHappened(true);
  }

  const handleSearchMovies = (query) => {
    localStorage.setItem('movieSearch', query);
    localStorage.setItem("isShortFilm", isShortFilm);

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      handleUpdateFilteredMovies(movies, query, isShortFilm);
    } else {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((cardsData) => {
          localStorage.setItem("allMovies", JSON.stringify(cardsData));
          handleUpdateFilteredMovies(cardsData, query, isShortFilm);
          setIsSearchHappened(true)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  const handleShortFilmToggle = (query) => {
    const newIsShortFilm = !isShortFilm;
    setIsShortFilm(newIsShortFilm);
    localStorage.setItem('movieSearch', query);
    localStorage.setItem("isShortFilm", newIsShortFilm);

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      handleUpdateFilteredMovies(movies, query, newIsShortFilm);
    } else {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((cardsData) => {
          localStorage.setItem("allMovies", JSON.stringify(cardsData));
          handleUpdateFilteredMovies(cardsData, query, newIsShortFilm);
          setIsSearchHappened(true)
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    if (localStorage.getItem("isShortFilm")) {
      const newIsShortFilm = JSON.parse(localStorage.getItem("isShortFilm"));
      setIsShortFilm(newIsShortFilm);
      handleSearchMovies(localStorage.getItem("movieSearch") ? localStorage.getItem("movieSearch") : '')
    }
  }, [])

  useEffect(() => {
  }, [isShortFilm])

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className='movies'>
        <SearchForm
          handleSearchMoviesFilms={handleSearchMovies}
          handleShortFilmToggle={handleShortFilmToggle}
          isShortFilm={isShortFilm}
        />
        <MoviesCardList
          movies={filteredMovies}
          isLoading={isLoading}
          isSavedMovies={false}
          savedMovies={savedMovies}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          isSearchHappened={isSearchHappened}
          isNewSearch={isNewSearch}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;