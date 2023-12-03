export function durationConverter(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч${minutes}м`;
}

export function filterDuration(movies) {
    return movies.filter((movie) => movie.duration < 40);
}

export function filterMovies(movies, query) {
    const filteredMovies = movies?.filter((i) => {
        const { nameRU, nameEN } = i;
        const lowercaseQuery = query?.toLowerCase();
        return (
            nameRU?.toLowerCase().includes(lowercaseQuery)
            || nameEN?.toLowerCase().includes(lowercaseQuery)
        );
    })

    return filteredMovies;
}