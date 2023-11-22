import React from 'react';
import './Portfolio.css';
import { Link } from 'react-router-dom';

const Portfolio = () => {
    return (
        <section className='portfolio'>
            <h3 className='portfolio__title'>Портфолио</h3>
            <ul className='portfolio__list'>
                <li
                    className='portfolio__item'
                >
                    <Link
                        className='portfolio__link'
                        to='https://github.com/danya-kim99/how-to-learn'
                        target='_blank'
                    >
                        Статичный сайт
                        <span className='portfolio__icon'>↗</span>
                    </Link>
                </li>
                <li
                    className='portfolio__item'
                >
                    <Link
                        className='portfolio__link'
                        to='https://github.com/danya-kim99/russian-travel'
                        target='_blank'
                    >
                        Адаптивный сайт
                        <span className='portfolio__icon'>↗</span>
                    </Link>
                </li>
                <li
                    className='portfolio__item'
                >
                    <Link
                        className='portfolio__link'
                        to='https://github.com/danya-kim99/react-mesto-api-full-gha'
                        target='_blank'
                    >
                        Одностраничное приложение
                        <span className='portfolio__icon'>↗</span>
                    </Link>
                </li>
            </ul>
        </section>
    );
};

export default Portfolio;