import config from 'config';
import { authHeader } from '../_helpers';

export const questionService = {
    getAll,
    create,
    createAnswer
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/questions/`, requestOptions).then(handleResponse);
}

function create(text, username) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({text, username})
    };

    return fetch(`${config.apiUrl}/questions/create`, requestOptions).then(handleResponse);
}

function createAnswer(_id, text, username) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({_id, text, username})
    };
    return fetch(`${config.apiUrl}/answers/create`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        return data;
    });
}