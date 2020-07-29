import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    users: [],
    loadingUsers: false,
    error: null
}

const getUsersStart = (state, action) => {
    return updateObject(state, { loadingUsers: true })
}

const getUsersSuccess = (state, action) => {
    return updateObject(state, {
        loadingUsers: false,
        users: action.users
    })
}

const getUsersFail = (state, action) => {
    return updateObject(state, { loadingUsers: false, error: action.error })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_USERS_START:
            return getUsersStart(state, action);
        case actionTypes.GET_ALL_USERS_SUCCESS:
            return getUsersSuccess(state, action);
        case actionTypes.GET_ALL_USERS_FAIL:
            return getUsersFail(state, action);
        default: return state;
    }
}

export default reducer;