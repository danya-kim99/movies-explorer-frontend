import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { UserAgentContext } from '../../../contexts/UserAgentContext';
import { userAgent } from "../../../utils/constants";
import './MoviesCardList.css';

function MoviesCardList({
  movies,
  isSavedMovies,
  savedMovies,
  handleSaveMovie,
  handleDeleteMovie,
  isLoading,
}) {

  const currentPath = useLocation().pathname;
  const [shownMovies, setShownMovies] = useState(0);

  const shownCount = () => {
    const display = window.innerWidth;
    if (display >= userAgent.desktop.resolution) {
      setShownMovies(userAgent.desktop.movies);
    } else if (display >= userAgent.tablet.resolution) {
      setShownMovies(userAgent.tablet.movies);
    } else {
      setShownMovies(userAgent.mobile.movies);
    }
  }

  useEffect(() => {
    shownCount();
  }, []);

  const showMore = () => {
    const display = window.innerWidth;
    if (display > 1024) {
      setShownMovies(shownMovies + userAgent.desktop.more);
    } else if (display > 750) {
      setShownMovies(shownMovies + userAgent.tablet.more);
    } else {
      setShownMovies(shownMovies + userAgent.mobile.more);
    }
  }

  const getSavedMovieCard = (savedMovies, card) => {
    return !!savedMovies?.find((m) => m.movieId === card.id);
  }

  return (
    <section className='movies-card-list'>


      <ul className='movies-card-list__container'>
        {isLoading && <Preloader />}
        {movies.length === 0 && <p className='movies-card-list__nothing'>Ничего не найдено.</p>}
        {currentPath === "/saved-movies" ? (
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
        movies.length > shownMovies ? (
          <button className='movies-card-list__expand' onClick={showMore} type='button' aria-label='Ещё'>
            Ещё
          </button>
        ) : ('')
      }

    </section>
  );
}

export default MoviesCardList;