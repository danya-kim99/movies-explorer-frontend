import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ list, savedmovies }) {
  return (
    <section className='movies-card-list'>
      <ul className='movies-card-list__container'>
        {list.map((item) => (
          <MoviesCard
            key={item.id}
            card={item}
            savedmovies={savedmovies}
          />
        ))}
      </ul>
      {savedmovies ? null : (
        <button
          className='movies-card-list__expand'
          type='button'
          aria-label='Ещё'
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;