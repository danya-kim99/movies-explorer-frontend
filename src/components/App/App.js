import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { UserAgentContext } from '../../contexts/UserAgentContext';
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from '../../utils/MainApi';
import { UserAgent } from '../../utils/constants';
import filterMovies from '../../utils/filterMovies';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Preloader from '../Movies/Preloader/Preloader';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css'


const App = () => {
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [device, setDevice] = useState('desktop');
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      mainApi
        .checkToken(token)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setisLoggedIn(true);
            navigate(currentLocation.pathname, { replace: true });

          }
        })
        .catch(() => {
          setisLoggedIn(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setisLoggedIn(false);
    }
  }, [])

  useEffect(() => {
    const handleWidth = () => {
      if (window.innerWidth > UserAgent.tablet.resolution) {
        setDevice('desktop');
      } else if (window.innerWidth > UserAgent.mobile.resolution) {
        setDevice('tablet');
      } else {
        setDevice('mobile');
      }
    };
    handleWidth();
    window.addEventListener('resize', handleWidth);

    return () => window.removeEventListener('resize', handleWidth);
  }, [device]);

  const handleLogin = (values) => {
    const { email, password } = values;
    setIsFormSubmitting(true);
    mainApi.authorize(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setisLoggedIn(true);
        setIsSuccess(true);
        navigate('/movies', { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsFormSubmitting(false);
      })
  };
  const handleRegister = (values) => {
    const { name, email, password } = values;
    setIsFormSubmitting(true)
    mainApi.register(name, email, password)
      .then(() => {
        setIsSuccess(true);
        handleLogin(values);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsFormSubmitting(false);
      })


  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setisLoggedIn(false);
    localStorage.removeItem("movies");
    localStorage.removeItem("movieSearch");
    localStorage.removeItem("notShortMovies");
    localStorage.removeItem("allMovies");
    localStorage.clear();
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getProfileInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
      mainApi
        .getMovies()
        .then((moviesData) => {
          setSavedMovies(moviesData.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn, navigate]);

  const handleUpdateUserInfo = (newData) => {
    setIsFormSubmitting(true);
    mainApi
      .patchProfileInfo(newData)
      .then((data) => {
        setIsSuccess(true);
        setCurrentUser(data.data);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setIsFormSubmitting(false);
      })
  }

  const handleSaveMovie = (movie) => {
    mainApi
      .postMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDeleteMovie = (movie) => {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((state) => {
          return state.filter((item) => item._id !== movie._id)
        })
      })
      .catch((err) => {
        console.log(err);
      });
      
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <UserAgentContext.Provider value={device}>
        <div className="app">
          {isLoading ? (
            <Preloader isPreloaderLoading={isLoading} position="main" />
          ) : (
            <Routes>
              <Route
                path='/'
                element={
                  <Main
                    isLoggedIn={isLoggedIn}
                  />}
              />
              <Route
                path='/movies'
                element={<ProtectedRoute
                  element={Movies}
                  savedMovies={savedMovies}
                  isLoggedIn={isLoggedIn}
                  handleDeleteMovie={handleDeleteMovie}
                  handleSaveMovie={handleSaveMovie}
                />}
              />
              <Route
                path='/saved-movies'
                element={<ProtectedRoute
                  element={SavedMovies}
                  Component={SavedMovies}
                  path='/saved-movies'
                  isLoggedIn={isLoggedIn}
                  savedMovies={savedMovies}
                  handleDeleteMovie={handleDeleteMovie}
                />}
              />
              <Route
                path='/profile'
                element={<ProtectedRoute
                  element={Profile}
                  isLoggedIn={isLoggedIn}
                  isFormSubmitting={isFormSubmitting}
                  handleSignOut={handleLogout}
                  handleUpdateUserInfo={handleUpdateUserInfo}
                  isSuccess={isSuccess}
                />}
              />
              <Route
                path='/signup'
                element={
                  <Register
                    isLoggedIn={isLoggedIn}
                    onRegister={handleRegister}
                    isSuccess={isSuccess}
                    isLoading={isFormSubmitting}
                  />
                }
              />
              <Route
                path='/signin'
                element={
                  <Login
                    isLoggedIn={isLoggedIn}
                    onLogin={handleLogin}
                    isSuccess={isSuccess}
                    isLoading={isFormSubmitting}
                  />
                }
              />
              <Route
                path='*'
                element={<NotFound />}
              />
            </Routes>
          )}
        </div>

      </UserAgentContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default App;