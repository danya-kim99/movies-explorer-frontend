import { useEffect } from 'react';
import { MoviesApi } from '../../../utils/constants';
import LikeButton from './LikeButton/LikeButton'
import './MoviesCard.css';


function MoviesCard({
  saved,
  movie,
  isSavedMovies,
  handleSaveMovie,
  handleDeleteMovie,
  savedMovies,
}) {

  function handleDelete() {
    return handleDeleteMovie(movie);
  }

  function handleCardClick() {
    if (saved) {
      handleDeleteMovie(savedMovies.filter((m) => m.movieId === movie.id)[0]);
    } else {
      handleSaveMovie(movie);
    }
  }


  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return `${hours}ч ${minutes}м`;
  }

  return (
    <li className='movie'>
      <section className='movie__card'>
        <a href={movie.trailerLink} target='blank'>
          <img
            src={isSavedMovies ? movie.image : `${MoviesApi.baseUrl}/${movie.image.url}`}
            className='movie__picture'
            alt={`Фильм под названием ${movie.nameRU}`}
          />
        </a>
        {isSavedMovies ?
          (<LikeButton
            saved={saved}
            onClick={handleDelete}
          />) : (
            <LikeButton
              saved={saved}
              onClick={handleCardClick}
            />
          )}
      </section>
      <section className='movie__header'>
        <h2 className='movie__title'>{movie.nameRU}</h2>
        <p className='movie__duration'>{getTimeFromMins(movie.duration)}</p>
      </section>
    </li>
  );
}

export default MoviesCard;