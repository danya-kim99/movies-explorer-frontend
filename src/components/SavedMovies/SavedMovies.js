import React, { useEffect, useState } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { moviesApi } from '../../utils/MoviesApi';
import { filterMovies, filterDuration } from "../../utils/filterMovies";
import './SavedMovies.css';

function SavedMovies({
  isLoggedIn,
  handleDeleteMovie,
  savedMovies,
}) {

  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpdateFilteredMovies = (movies, query, short) => {
    const moviesCardList = filterMovies(movies, query, short);

    setFilteredMovies(moviesCardList);
    setFilteredMovies(short ? filterDuration(moviesCardList) : moviesCardList);
    setSearchQuery(query);
  }

  const handleShortFilmToggle = (query) => {
    setIsShortFilm(isShortFilm);

    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      const moviesCardList = filterMovies(movies, query, isShortFilm);

      setFilteredMovies(isShortFilm ? filterDuration(moviesCardList) : moviesCardList);
      setIsShortFilm(!isShortFilm);
      setSearchQuery(query);

      if (!isShortFilm) {
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
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      handleUpdateFilteredMovies(movies, query, isShortFilm);
    } else {
      moviesApi
        .getMovies()
        .then((cardsData) => {
          handleUpdateFilteredMovies(cardsData, query, isShortFilm);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    const moviesCardList = filterMovies(savedMovies, searchQuery);
    setFilteredMovies(
      isShortFilm ? filterDuration(moviesCardList) : moviesCardList
    );
  }, [savedMovies, isShortFilm, searchQuery]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className='saved-movies'>
        <SearchForm
          handleSearchMoviesFilms={handleSearchMoviesFilms}
          handleShortFilmToggle={handleShortFilmToggle}
          isShortFilm={!isShortFilm}
        />
        <MoviesCardList
          movies={filteredMovies}
          isSavedMovies={true}
          savedMovies={savedMovies}
          handleDeleteMovie={handleDeleteMovie}
        >
        </MoviesCardList>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;