import React from 'react';
import './AboutProject.css';
import SectionTitle from '../SectionTitle/SectionTitle';

const AboutProject = () => {
    return (
        <section className='about'>
            <div className='about__content'>
                <SectionTitle title="О проекте" />
                <ul className='about__info-content'>
                    <li className='about__info-element'>
                        <h3 className='about__info-title'>Дипломный проект включал 5 этапов</h3>
                        <p className='about__info-description'>
                            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
                            финальные доработки.
                        </p>
                    </li>
                    <li className='about__info-element'>
                        <h3 className='about__info-title'>На выполнение диплома ушло 5 недель</h3>
                        <p className='about__info-description'>
                            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
                            успешно защититься.
                        </p>
                    </li>
                </ul>
                <div className='about__duration'>
                    <h3 className='about__duration-time'>
                        1 неделя
                    </h3>
                    <h3 className='about__duration-time about__duration-time_other'>4 недели</h3>
                    <p className='about__duration-description'>Back-end</p>
                    <p className='about__duration-description'>Front-end</p>
                </div>
            </div>
        </section>
    );
};

export default AboutProject;