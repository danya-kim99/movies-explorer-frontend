import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Movies.css';

function Movies({ list }) {
  return (
    <>
    <Header />
    <main className='movies'>
        <SearchForm />
        <MoviesCardList list={list} />
    </main>
    <Footer />
    </>
  );
}

export default Movies;