import axios from "../../axios-instance";
import * as actionTypes from "./actionTypes";

export const getAllUsersStart = () => {
    return {
        type: actionTypes.GET_ALL_USERS_START,
    }
}

export const getAllUsersSuccess = (users) => {
    return {
        type: actionTypes.GET_ALL_USERS_SUCCESS,
        users: users
    }
}

export const getAllUsersFail = (error) => {
    return {
        type: actionTypes.GET_ALL_USERS_FAIL,
        error: error,
    }
}

export const getAllUsers = (token) => {
    return dispatch => {
        dispatch(getAllUsersStart())
        axios.get("/users", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                dispatch(getAllUsersSuccess(response.data.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}