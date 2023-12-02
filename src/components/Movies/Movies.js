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
  const [isNotShortFilm, setIsNotShortFilm] = useState(false);
  const [isReqError, setisReqError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleUpdateFilteredMovies = (movies, query, short) => {
    const moviesCardList = filterMovies(movies, query, short);

    setFilteredMovies(short ? filterDuration(moviesCardList) : moviesCardList);

    localStorage.setItem("movies", JSON.stringify(moviesCardList));
    localStorage.setItem("allMovies", JSON.stringify(movies));
  }

  const handleShortFilmToggle = (query) => {
    setIsNotShortFilm(!isNotShortFilm);
    localStorage.setItem("movieSearch", query);
    localStorage.setItem("notShortMovies", isNotShortFilm);

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      const moviesCardList = filterMovies(movies, query, isNotShortFilm);

      setFilteredMovies(isNotShortFilm ? filterDuration(moviesCardList) : moviesCardList);

      localStorage.setItem("movies", JSON.stringify(moviesCardList));

      if (!isNotShortFilm) {
        if (filterDuration(movies).length === 0) {
          setFilteredMovies(filterDuration(movies));
        } else {
          setFilteredMovies(filterDuration(movies));
        }
      } else {
        setFilteredMovies(movies);
      }
    }
    handleSearchMoviesFilms(query);
  }

  const handleSearchMoviesFilms = (query) => {
    localStorage.setItem("movieSearch", query);
    localStorage.setItem("notShortMovies", !isNotShortFilm);

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      handleUpdateFilteredMovies(movies, query, isNotShortFilm);
    } else {
      setIsLoading(true);
      moviesApi
        .getMovies()
        .then((cardsData) => {
          handleUpdateFilteredMovies(cardsData, query, !isNotShortFilm);
          setisReqError(false);
        })
        .catch((err) => {
          setisReqError(true);
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("notShortMovies")) === true) {
      setIsNotShortFilm(false);
    } else {
      setIsNotShortFilm(true);
    }
  }, []);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movies"));

    const checkbox = JSON.parse(localStorage.getItem("notShortMovies"));
    const query = localStorage.getItem("movieSearch");

    if (checkbox === true) {
      setIsNotShortFilm(true);
      handleShortFilmToggle(query); 
    } else if (checkbox === false) {
      setIsNotShortFilm(false);
      handleSearchMoviesFilms(query);
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem("movieSearch")) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className='movies'>
        <SearchForm
          handleSearchMoviesFilms={handleSearchMoviesFilms}
          handleShortFilmToggle={handleShortFilmToggle}
          isShortFilm={isNotShortFilm}
        />
        <MoviesCardList
          movies={filteredMovies}
          isLoading={isLoading}
          isSavedMovies={false}
          isReqError={isReqError}
          isNotFound={isNotFound}
          savedMovies={savedMovies}
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;