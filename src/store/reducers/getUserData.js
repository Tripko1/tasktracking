import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    userData: {
        id: null,
        img: null,
        name: null,
        username: null,
        email: null,
        bio: null
    },
    error: null,
    loading: false,
    loadingImg: false,
    w: false
}

const userDataStart = (state, action) => {
    return updateObject(state, { loading: true, })
}

const userDataSuccess = (state, action) => {
    return updateObject(state, {
        loading: false, userData: {
            id: action.id,
            img: action.img,
            name: action.name,
            username: action.username,
            email: action.email,
            bio: action.bio
        }
    })
}

const userDataFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error })
}

const uploadStart = (state, action) => {
    return updateObject(state, { loadingImg: true })
}

const uploadFail = (state, action) => {
    return updateObject(state, { loadingImg: false, error: action.error })
}

const uploadSuccess = (state, action) => {
    return updateObject(state, {
        loadingImg: false,
        userData: {
            id: action.id,
            img: action.img,
            name: action.name,
            username: action.username,
            email: action.email,
            bio: action.bio
        }
    })
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

const editProfileStart = (state, action) => {
    return updateObject(state, { loadingEditProfile: true })
}

const editProfileSuccess = (state, action) => {
    return updateObject(state, {
        loadingEditProfile: false, userData: {
            id: action.id,
            img: action.img,
            name: action.name,
            username: action.username,
            email: action.email,
            bio: action.bio
        }
    })
}

const editProfileFail = (state, action) => {
    return updateObject(state, { loadingEditProfile: false, error: action.error })
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_DATA_START:
            return userDataStart(state, action);
        case actionTypes.GET_USER_DATA_SUCCESS:
            return userDataSuccess(state, action);
        case actionTypes.GET_USER_DATA_FAIL:
            return userDataFail(state, action);
        case actionTypes.UPLOAD_IMAGE_START:
            return uploadStart(state, action);
        case actionTypes.UPLOAD_IMAGE_FAIL:
            return uploadFail(state, action);
        case actionTypes.UPLOAD_IMAGE_SUCCESS:
            return uploadSuccess(state, action);
        case actionTypes.GET_ALL_USERS_START:
            return getUsersStart(state, action);
        case actionTypes.GET_ALL_USERS_SUCCESS:
            return getUsersSuccess(state, action);
        case actionTypes.GET_ALL_USERS_FAIL:
            return getUsersFail(state, action);
        case actionTypes.GET_EDIT_PROFILE_START:
            return editProfileStart(state, action);
        case actionTypes.GET_EDIT_PROFILE_SUCCESS:
            return editProfileSuccess(state, action);
        case actionTypes.GET_EDIT_PROFILE_FAIL:
            return editProfileFail(state, action);
        default: return state;
    }
}

export default reducer;