import axios from "../../axios-instance";
import * as actionTypes from "./actionTypes";

export const getUserDataStart = () => {
    return {
        type: actionTypes.GET_USER_DATA_START,
    }
}

export const getUserDataSuccess = (data) => {
    return {
        type: actionTypes.GET_USER_DATA_SUCCESS,
        id: data.id,
        img: data.img,
        name: data.name,
        username: data.username,
        email: data.email
    }
}

export const getUserDataFail = (error) => {
    return {
        type: actionTypes.GET_USER_DATA_FAIL,
        error: error
    }
}

export const getUserData = (token) => {
    return (dispatch) => {
        dispatch(getUserDataStart());
        axios.get("api/me", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                dispatch(getUserDataSuccess(response.data.data));
            })
            .catch(error => {
                console.log(error.response.request.statusText);
                dispatch(getUserDataFail(error.response.request.statusText))
            })
    }
}