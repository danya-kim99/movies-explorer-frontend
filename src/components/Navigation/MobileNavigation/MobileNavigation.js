import DesktopNavigation from '../DesktopNavigation/DesktopNavigation';
import './MobileNavigation.css';

const MobileNavigation = ({ active, onCloseMenu }) => {
  return (
    <section className={active ? 'mobile-navigation mobile-navigation_active' : 'mobile-navigation'}>
      <section
        className='mobile-navigation__hover'
        onClick={onCloseMenu}
      >
        <section className='mobile-navigation__content' onClick={(e) => e.stopPropagation()}>
          <button
            type='button'
            aria-label='Закрыть'
            className='mobile-navigation__button'
            onClick={onCloseMenu}
          />
          < DesktopNavigation/>
        </section>
      </section>
    </section>
  );
};

export default MobileNavigation;