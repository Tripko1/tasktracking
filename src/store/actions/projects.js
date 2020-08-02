import axios from "../../axios-instance";
import * as actionTypes from "./actionTypes";

export const getMyProjectsStart = () => {
    return {
        type: actionTypes.GET_MY_PROJECTS_START
    }
}

export const getMyProjectsSuccess = (myProjects) => {
    return {
        type: actionTypes.GET_MY_PROJECTS_SUCCESS,
        myProjects: myProjects
    }
}

export const getMyProjectsFail = (error) => {
    return {
        type: actionTypes.GET_MY_PROJECTS_FAIL,
        error: error
    }
}

export const getMyProjects = (token) => {
    return dispatch => {
        dispatch(getMyProjectsStart());
        axios.get("/projects", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                dispatch(getMyProjectsSuccess(response.data.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const createProjectStart = () => {
    return {
        type: actionTypes.CREATE_PROJECT_START
    }
}

export const createProjectSuccess = (data) => {
    return {
        type: actionTypes.CREATE_PROJECT_SUCCESS,
        id: data.id,
        title: data.title
    }
}

export const createProjectFail = (error) => {
    return {
        type: actionTypes.CREATE_PROJECT_FAIL,
        error: error
    }
}

export const createProject = (token, title) => {
    return dispatch => {
        dispatch(createProjectStart());
        const body = {
            title: title
        }
        axios.post("/projects", body, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                dispatch(createProjectSuccess(response.data.data))
            })
            .catch(error => {
                console.log(error.response)
                // dispatch(createProjectFail(error.response))
            })
    }
}

export const getAllCheklistStart = () => {
    return {
        type: actionTypes.GET_ALL_CHECKLIST_START
    }
}

export const getAllCheklistSuccess = () => {
    return {
        type: actionTypes.GET_ALL_CHECKLIST_SUCCESS
    }
}

export const getAllCheklistFail = () => {
    return {
        type: actionTypes.GET_ALL_CHECKLIST_FAIL
    }
}

export const getAllChecklist = (token, id) => {
    return dispatch => {
        axios.get("/checklists/" + id, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
}