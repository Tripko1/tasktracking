import axios from "../../axios-instance";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const authSuccess = (token, userId, name, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        name: name,
        email: email
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {

        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: email,
            password: password,
            returnSecureToken: true,
        };
        axios.post('api/login', authData)
            .then(response => {
                let expirationDate = new Date(new Date().getTime() + response.data.token.expires_in);
                localStorage.setItem("token", response.data.token.access_token);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("userId", response.data.user.id);
                localStorage.setItem("name", response.data.user.name);
                localStorage.setItem("email", response.data.user.email);
                dispatch(authSuccess(response.data.token.access_token, response.data.user.id, response.data.user.name, response.data.user.email));
                dispatch(checkAuthTimeout(response.data.token.expires_in));
            })
            .catch(err => {
                console.log(err.response);
                dispatch(authFail(err.response.data));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem("userId");
                const name = localStorage.getItem("name");
                const email = localStorage.getItem("email");
                dispatch(authSuccess(token, userId, name, email));
                dispatch(
                    checkAuthTimeout(
                        expirationDate.getTime() - new Date().getTime()
                    )
                );
            }
        }
    };
};

export const registrationStart = () => {
    return {
        type: actionTypes.REGISTRATION_START,
    }
}

export const registrationFail = (error) => {
    return {
        type: actionTypes.REGISTRATION_FAIL,
        error: error,
    };
};

export const registrationSuccess = () => {
    return {
        type: actionTypes.REGISTRATION_SUCCESS,
    };
};

export const registration = (name, username, email, password, password_confirmation) => {
    return dispatch => {
        dispatch(registrationStart());
        const regData = {
            email: email,
            username: username,
            name: name,
            password: password,
            password_confirmation: password_confirmation,
            returnSecureToken: true,
        };
        axios.post('api/register', regData)
            .then(response => {
                console.log(response);
                dispatch(registrationSuccess());
            })
            .catch(err => {
                console.log(err.response);
                dispatch(registrationFail(err))
            })
    }
}

export const setSuccess = () => {
    return {
        type: actionTypes.SET_SUCCESS
    }
}