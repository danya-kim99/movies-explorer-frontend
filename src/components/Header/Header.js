import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className='header'>
      <figure
        className='header__logo'
        onClick={() => navigate('/')}
      ></figure>
      <Navigation />
    </header>
  );
};

export default Header;