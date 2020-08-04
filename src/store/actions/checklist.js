import * as actionTypes from "./actionTypes";
import axios from "../../axios-instance";

export const getAllCheklistStart = () => {
    return {
        type: actionTypes.GET_ALL_CHECKLIST_START
    }
}

export const getAllCheklistSuccess = (data) => {
    return {
        type: actionTypes.GET_ALL_CHECKLIST_SUCCESS,
        checklists: data
    }
}

export const getAllCheklistFail = (error) => {
    return {
        type: actionTypes.GET_ALL_CHECKLIST_FAIL,
        error: error
    }
}

export const getAllChecklist = (token, id) => {
    return dispatch => {
        dispatch(getAllCheklistStart())
        axios.get("/checklists/" + id, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                dispatch(getAllCheklistSuccess(response.data.data))
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const createChecklistStart = () => {
    return {
        type: actionTypes.CREATE_CHECKLIST_START
    }
}

export const createChecklistSuccess = (data) => {
    return {
        type: actionTypes.CREATE_CHECKLIST_SUCCESS,
        id: data.id,
        title: data.title,
        tasks_count: data.tasks_count
    }
}

export const createChecklistFail = (error) => {
    return {
        type: actionTypes.CREATE_CHECKLIST_FAIL,
        error: error
    }
}

export const createChecklist = (token, title, id) => {
    return dispatch => {
        dispatch(createChecklistStart());
        const data = {
            title: title,
            project_id: id
        }
        axios.post("/checklists", data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                console.log(response.data.data)
                dispatch(createChecklistSuccess(response.data.data))
            })
            .catch(error => {
                console.log(error.response)
            })
    }
}

export const updateChecklistStart = (id) => {
    return {
        type: actionTypes.UPDATE_CHECKLIST_START,
        id: id
    }
}

export const updateChecklistSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_CHECKLIST_SUCCESS,
        id: data.id,
        title: data.title,
        tasks_count: data.tasks_count
    }
}

export const updateChecklistFail = (error) => {
    return {
        type: actionTypes.UPDATE_CHECKLIST_FAIL,
        error: error
    }
}

export const updateChecklist = (token, title, id) => {
    return dispatch => {
        dispatch(updateChecklistStart(id))
        const data = { title: title }
        axios.put("/checklists/" + id, data, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                console.log(response.data)
                dispatch(updateChecklistSuccess(response.data.data))
            })
            .catch(error => {
                console.log(error.response)
            })
    }
}
