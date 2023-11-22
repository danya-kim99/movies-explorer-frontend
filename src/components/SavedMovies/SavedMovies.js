import React from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './SavedMovies.css';

function SavedMovies({ isLoggedIn, list }) {
  const moviesFilter = list.filter((item) => !item.owner);

  return (
    <>
    <Header isLoggedIn={isLoggedIn} />
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList
        list={moviesFilter}
        savedmovies={true}
        >
      </MoviesCardList>
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies;