import * as actionTypes from './actionTypes';
import axios from 'axios';
import jwt from 'jwt-decode';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTime = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expireTime * 1000)
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
        let url = 'http://localhost:3000/api/user/register';
        if (!isSignup) {
            url = 'http://localhost:3000/api/user/login';
        }
        axios.post(url, authData)
            .then(res => {
                const token = res.data;
                const expiresHour = 3600;
                const user = jwt(token);
                const expiresDate = new Date(new Date().getTime() + expiresHour * 1000);
                localStorage.setItem('token', user.accessToken);
                localStorage.setItem('userId', user._id);
                localStorage.setItem('expiresDate', expiresDate);
                dispatch(authSuccess(user.accessToken, user._id));
                dispatch(checkAuthTime(expiresHour));
            })
            .catch(err => {
                console.log(err.message)
                dispatch(authFail(err.message));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expiresDate = new Date(localStorage.getItem('expiresDate'));
            if (expiresDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTime((expiresDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}