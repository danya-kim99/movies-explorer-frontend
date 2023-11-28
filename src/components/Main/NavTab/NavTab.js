import React from 'react';
import './NavTab.css';
import { Link } from 'react-router-dom';

const NavTab = () => {
    return (
        <nav className='navtab'>
            <ul className='navtab__content'>
                <li>
                    <Link
                        className='navtab__link'
                    >О проекте
                    </Link>
                </li>
                <li>
                    <Link
                        className='navtab__link'
                    >Технологии
                    </Link>
                </li>
                <li>
                    <Link
                        className='navtab__link'
                    >Студент
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavTab;