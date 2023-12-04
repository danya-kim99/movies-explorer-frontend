import React, { useEffect, useState } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';
import { filterMovies, filterDuration } from "../../utils/filterMovies";
import './SavedMovies.css';

function SavedMovies({
  isLoggedIn,
  handleDeleteMovie,
  savedMovies,
}) {

  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchHappened, setIsSearchHappened] = useState(false);

  const handleUpdateFilteredMovies = (movies, query, short) => {
    const moviesCardList = filterMovies(movies, query, short);
    setFilteredMovies(short ? filterDuration(moviesCardList) : moviesCardList);
    setSearchQuery(query);
    setIsSearchHappened(true);
  }

  const handleShortFilmToggle = (query) => {
    setIsShortFilm(isShortFilm);

    if (localStorage.getItem("savedMovies")) {
      const movies = JSON.parse(localStorage.getItem("savedMovies"));
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
    if (localStorage.getItem("savedMovies")) {
      const movies = JSON.parse(localStorage.getItem("savedMovies"));
      handleUpdateFilteredMovies(movies, query, isShortFilm);
    } else {
      mainApi
        .getMovies()
        .then((cardsData) => {
          localStorage.setItem("savedMovies", JSON.stringify(cardsData.data))
          handleUpdateFilteredMovies(cardsData.data, query, isShortFilm);
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
          isShortFilm={isShortFilm}
        />
        <MoviesCardList
          movies={filteredMovies}
          isSavedMovies={true}
          savedMovies={savedMovies}
          handleDeleteMovie={handleDeleteMovie}
          isSearchHappened={isSearchHappened}
        >
        </MoviesCardList>
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;