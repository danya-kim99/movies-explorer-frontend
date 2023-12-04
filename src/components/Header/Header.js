import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = ({isLoggedIn}) => {
  const navigate = useNavigate();

  return (
    <header className='header'>
      <figure
        className='header__logo'
        onClick={() => navigate('/')}
      ></figure>
      <Navigation isLoggedIn={isLoggedIn} />
    </header>
  );
};

export default Header;