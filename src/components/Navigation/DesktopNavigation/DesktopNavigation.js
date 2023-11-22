import React from 'react';
import { NavLink } from 'react-router-dom';
import './DesktopNavigation.css';

const DesktopNavigation = ({ isDesktop }) => {
    return (
        <nav className='links'>
            <ul className='links__list'>
                {!isDesktop && (
                    <li className='links__list-item'>
                        <NavLink
                            className={({ isActive }) => `links__link links__link_default ${isActive && 'links__link_active'}`}
                            to='/'
                        >Главная
                        </NavLink>
                    </li>
                )}
                <li className='links__list-item'>
                    <NavLink
                        className={({ isActive }) => `links__link links__link_default ${isActive && 'links__link_active'}`}
                        to='/movies'
                    >Фильмы
                    </NavLink>
                </li>
                <li className='links__list-item'>
                    <NavLink
                        className={({ isActive }) => `links__link links__link_default ${isActive && 'links__link_active'}`}
                        to='/saved-movies'
                    >Сохранённые фильмы
                    </NavLink>
                </li>
                <li className='links__list-item'>
                    <NavLink
                        className='links__link links__link_profile'
                        to='/profile'
                    >Аккаунт
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default DesktopNavigation;