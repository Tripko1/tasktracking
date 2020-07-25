import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility"

const initialState = {
    token: null,
    userId: null,
    name: null,
    email: null,
    error: null,
    loading: false,
    authRedirectPath: "/",
}

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authFail = (state, action) => {
    return updateObject(state, { error: action.error, loading: false });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        name: action.name,
        email: action.email,
        error: null,
        loading: false,
        success: false,
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        name: null,
        email: null,
    })
}

const regStart = (state, action) => {
    return updateObject(state, { error: null, loading: true, success: false })
}

const regSuccess = (state, action) => {
    return updateObject(state, { loading: false, success: true })
}

const regFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error, success: false })
}

const setSucc = (state, action) => {
    return updateObject(state, { success: false })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action)
        case actionTypes.REGISTRATION_START:
            return regStart(state, action)
        case actionTypes.REGISTRATION_SUCCESS:
            return regSuccess(state, action)
        case actionTypes.REGISTRATION_FAIL:
            return regFail(state, action)
        case actionTypes.SET_SUCCESS:
            return setSucc(state, action)
        default:
            return state;
    }
}

export default reducer;