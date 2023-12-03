import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { UserAgentContext } from '../../../contexts/UserAgentContext';
import { UserAgent } from "../../../utils/constants";
import './MoviesCardList.css';

function MoviesCardList({
  movies,
  isSavedMovies,
  savedMovies,
  handleSaveMovie,
  handleDeleteMovie,
  isLoading,
  isSearchHappened
}) {

  const currentPath = useLocation().pathname;
  const [shownMovies, setShownMovies] = useState(0);

  const shownCount = () => {
    const display = window.innerWidth;
    if (display > UserAgent.desktop.resolutionForLoad) {
      setShownMovies(UserAgent.desktop.movies);
    } else if (display > UserAgent.tablet.resolutionForLoad) {
      setShownMovies(UserAgent.tablet.movies);
    } else {
      setShownMovies(UserAgent.mobile.movies);
    }
  }

  useEffect(() => {
    shownCount();
  }, []);

  const showMore = () => {
    const display = window.innerWidth;
    if (display > UserAgent.desktop.resolutionForLoad) {
      setShownMovies(shownMovies + UserAgent.desktop.more);
    } else if (display > UserAgent.tablet.resolutionForLoad) {
      setShownMovies(shownMovies + UserAgent.tablet.more);
    } else {
      setShownMovies(shownMovies + UserAgent.mobile.more);
    }
  }

  const getSavedMovieCard = (savedMovies, card) => {
    return !!savedMovies?.find((m) => m.movieId === card.id);
  }

  return (
    <section className='movies-card-list'>


      <ul className='movies-card-list__container'>
        {isLoading && <Preloader />}
        {!isLoading && isSearchHappened && movies.length === 0 && <p className='movies-card-list__nothing'>Ничего не найдено.</p>}
        {currentPath === "/saved-movies" ? (
          movies.map(movie => (
            <MoviesCard
              key={isSavedMovies ? movie._id : movie.id}
              saved={getSavedMovieCard(savedMovies, movie)}
              movies={movies}
              movie={movie}
              isSavedMovies={isSavedMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
            />
          ))

        ) : (

          movies.slice(0, shownMovies).map(movie => (
            <MoviesCard
              key={isSavedMovies ? movie._id : movie.id}
              saved={getSavedMovieCard(savedMovies, movie)}
              movies={movies}
              movie={movie}
              isSavedMovies={isSavedMovies}
              handleSaveMovie={handleSaveMovie}
              handleDeleteMovie={handleDeleteMovie}
              savedMovies={savedMovies}
            />
          )
          )

        )}
      </ul>
      {
        movies.length > shownMovies && currentPath !== "/saved-movies" ? (
          <button className='movies-card-list__expand' onClick={showMore} type='button' aria-label='Ещё'>
            Ещё
          </button>
        ) : ('')
      }

    </section>
  );
}

export default MoviesCardList;