import React, { useContext, useEffect, useState } from 'react';
import './Navigation.css';
import DesktopNavigation from './DesktopNavigation/DesktopNavigation';
import MobileNavigation from './MobileNavigation/MobileNavigation';
import { UserAgentContext } from '../../contexts/UserAgentContext';
import { useLocation } from 'react-router-dom';
import AuthNavigation from './AuthNavigation/AuthNavigation';

const Navigation = () => {
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);
  const device = useContext(UserAgentContext);
  const [isDesktop, setDesktop] = useState(true);

  const handleMenu = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    if (device === 'desktop') {
      setDesktop(true);
      setMenuActive(false);
    } else {
      setDesktop(false);
    }
  }, [device]);

  return (
    <>
      {location.pathname === '/' ? (
        <AuthNavigation />
      ) : (
        <>
          {isDesktop ? (
            <DesktopNavigation isDesktop={isDesktop} />
          ) : (
            <button
              type='button'
              className='header__navigation'
              onClick={handleMenu}
            />
          )}
          <MobileNavigation
            active={menuActive}
            onCloseMenu={handleMenu}
          />
        </>
      )}
    </>
  );
};

export default Navigation;