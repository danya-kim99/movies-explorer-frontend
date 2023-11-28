import React from 'react';
import './AboutMe.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import img from '../../../images/vitalii.png';
import { Link } from 'react-router-dom';

const AboutMe = () => {
    return (
        <section
            className='aboutme'
        >
            <SectionTitle title='Студент' />
            <section className='aboutme__content'>
                <section className='aboutme__info'>
                    <h3 className='aboutme__name'>Виталий</h3>
                    <p className='aboutme__position'>Фронтенд-разработчик, 30 лет</p>
                    <p className='aboutme__description'>
                        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <Link
                        className='aboutme__link'
                        to='https://github.com/danya-kim99'
                        target='_blank'
                    >
                        Github
                    </Link>
                </section>
                <img
                    src={img}
                    alt='Виталий'
                    className='aboutme__photo'
                />
            </section>
        </section>
    );
};

export default AboutMe;