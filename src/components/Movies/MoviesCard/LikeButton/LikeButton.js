import React from 'react';
import { useLocation } from 'react-router-dom';
import '../MoviesCard.css';

function LikeButton({saved, onClick}) {

    const currentPath = useLocation().pathname;

    const cardLikeButtonClassName = `${saved
        ? "movie__like_active"
        : "movie__like"}`;

    return (
        <button
            className={`${currentPath === '/saved-movies'
                ? 'movie__remove'
                : cardLikeButtonClassName}`}
            type='button'
            onClick={onClick}
        ></button>
    );
}
export default LikeButton;