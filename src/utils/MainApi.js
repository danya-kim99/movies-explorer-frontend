import { MainApi } from "./constants";
import { MoviesApi } from "./constants";

class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
    }

    _getResponseData(res, errorText) {
        if (!res.ok) {
            return Promise.reject(`${errorText} Код ошибки: ${res.status}`);
        }
        return res.json();
    }

    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(res => {
                return this._getResponseData(res, 'Не удалось зарегистрироваться.')
            });
    }

    authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                console.log(res)
                return this._getResponseData(res, 'Не удалось авторизоваться.')
            });
    }

    checkToken() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                return this._getResponseData(res, 'Не удалось авторизоваться.')
            });
    }

    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                return this._getResponseData(res, 'Не удалось получить информацию о профиле.')
            });
    }

    patchProfileInfo(values) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: values.name,
                email: values.email
            })
        })
            .then(res => {
                return this._getResponseData(res, 'Не удалось обновить информацию профиля.')
            });
    }

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                return this._getResponseData(res, 'Не удалось загрузить информацию.')
            });
    }

    postMovie(values) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country: values.country,
                director: values.director,
                duration: values.duration,
                year: values.year,
                description: values.description,
                image: `${MoviesApi.baseUrl}${values.image.url}`,
                trailerLink: values.trailerLink,
                thumbnail: `${MoviesApi.baseUrl}${values.image.formats.thumbnail.url}`,
                owner: values.owner,
                movieId: values.id,
                nameRU: values.nameRU,
                nameEN: values.nameEN
            })
        })
            .then(res => {
                return this._getResponseData(res, 'Не удалось сохранить фильм.')
            });
    }

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                return this._getResponseData(res, 'Не удалось удалить карточку.')
            });
    }

}



export const mainApi = new Api(MainApi)