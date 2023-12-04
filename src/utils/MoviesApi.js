import { MoviesApi } from "./constants";

class FilmsApi {
    constructor(options) {
        this._baseUrl = options.baseUrl
    }

    _getResponseData(res, errorText) {
        if (!res.ok) {
            return Promise.reject(`${errorText} Код ошибки: ${res.status}`);
        }
        return res.json();
    }

    getMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                return this._getResponseData(res, 'Не удалось авторизоваться.')
            });
    }

}


export const moviesApi = new FilmsApi(MoviesApi)