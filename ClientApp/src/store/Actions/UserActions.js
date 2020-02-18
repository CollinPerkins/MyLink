import { userConstants } from '../constants/UserConstants';
import * as alertActions from './AlertActions';
import { history } from '../../helpers/history';
import { authHeader, ROOT_API_URL } from '../../helpers/auth-header';

export const userActions = {
    register,
    login,
    logout,
    getAll
};

function register( password, email, phoneNumber, firstName, lastName) {
    return dispatch => {
        dispatch({
            type: userConstants.LOGIN_REQUEST,
            email
        });
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password, email, phoneNumber, firstName, lastName })
        };

        fetch(`${ROOT_API_URL}/Users/Register`, requestOptions)
            .then(handleResponse)
            .then(
                user => {
                    dispatch({
                        type: userConstants.LOGIN_SUCCESS,
                        email
                    });
                    history.push('/login');
                },
                error => {
                    dispatch({
                        type: userConstants.LOGIN_FAILURE,
                        error
                    });
                    dispatch(alertActions.error(error));
                }
            );
    };
}

function login(email, password) {
    return dispatch => {
        dispatch({
            type: userConstants.LOGIN_REQUEST,
            email
        });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        fetch(`${ROOT_API_URL}/users/Authenticate`, requestOptions)
            .then(handleResponse)
            .then(
                user => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch({
                        type: userConstants.LOGIN_SUCCESS,
                        email
                    });
                    history.push('/home');
                },
                error => {
                    dispatch({
                        type: userConstants.LOGIN_FAILURE,
                        error
                    });
                    dispatch(alertActions.error(error));
                }
            );
    };
}

function logout() {
    localStorage.removeItem('user');
    return { type: userConstants.LOGOUT };
}



function getAll() {
    return dispatch => {
        dispatch({
            type: userConstants.GETALL_REQUEST
        });
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };


        fetch(`${ROOT_API_URL}/users`, requestOptions)
            .then(handleResponse)
            .then(
                users => dispatch({
                    type: userConstants.GETALL_SUCCESS,
                    users
                }),
                error => {
                    dispatch({
                        type: userConstants.GETALL_FAILURE,
                        error
                    });
                    dispatch(alertActions.error(error))
                }
            );
    };
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                localStorage.removeItem('user');
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}