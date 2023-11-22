import { Route, Routes, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { UserAgentContext, windowWidth } from '../../contexts/UserAgentContext';
import Preloader from '../Movies/Preloader/Preloader';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css'
import { films } from '../../utils/constants';

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ name: 'Даниил', email: 'danya-kim@ya.ru' });
  const [device, setDevice] = useState('desktop');

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > windowWidth.tablet) {
        setDevice('desktop');
      } else if (window.innerWidth > windowWidth.mobile) {
        setDevice('tablet');
      } else {
        setDevice('mobile');
      }
    };
    handleWidth();
    window.addEventListener('resize', handleWidth);

    return () => window.removeEventListener('resize', handleWidth);
  }, [device]);

  const handleLogin = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: true }));
    navigate('/movies', { replace: true });
  };
  const handleRegister = () => {
    navigate('/signin');
  };
  const handleLogout = () => {
    setCurrentUser((prev) => ({ ...prev, isLoggedIn: false }));
    navigate('/', { replace: true });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <UserAgentContext.Provider value={device}>
        <Suspense fallback={<Preloader/>}>
        <section className="app">
            <Routes>
              <Route
                path='/'
                element={<Main/>}
              />
              <Route
                path='/movies'
                element={<Movies list={films} />}
              />
              <Route
                path='/saved-movies'
                element={<SavedMovies list={films} />} 
              />
              <Route
                path='/profile'
                element={<Profile onLogout={handleLogout} />}
              />
              <Route
                path='/sign-up'
                element={
                  <Register
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                  />
                }
              />
              <Route
                path='/sign-in'
                element={
                  <Login
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                  />
                }
              />
              <Route
                path='*'
                element={<NotFound />}
              />
            </Routes>
          </section>  
        </Suspense>
      </UserAgentContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;