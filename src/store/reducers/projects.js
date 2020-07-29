import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    myProjects: [],
    loadingProjects: false
}

const getProjectsStart = (state, action) => {
    return updateObject(state, { loadingProjects: true })
}

const getProjectsSuccess = (state, action) => {
    return updateObject(state, {
        loadingProjects: false,
        myProjects: action.myProjects
    })
}

const getProjectsFail = (state, action) => {
    return updateObject(state, { loadingProjects: false, error: action.error })
}

const projectStart = (state, action) => {
    return updateObject(state, { loadingProjects: false })
}

const projectSuccess = (state, action) => {
    const newProject = updateObject(action.myProjects, { id: action.id, title: action.title });
    return updateObject(state, {
        loadingProjects: false,
        myProjects: state.myProjects.concat(newProject)
    })
}

const projectFail = (state, action) => {
    return updateObject(state, { loadingProjects: false, error: action.error })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_MY_PROJECTS_START:
            return getProjectsStart(state, action);
        case actionTypes.GET_MY_PROJECTS_SUCCESS:
            return getProjectsSuccess(state, action);
        case actionTypes.GET_MY_PROJECTS_FAIL:
            return getProjectsFail(state, action);
        case actionTypes.CREATE_PROJECT_START:
            return projectStart(state, action);
        case actionTypes.CREATE_PROJECT_SUCCESS:
            return projectSuccess(state, action);
        case actionTypes.CREATE_PROJECT_FAIL:
            return projectFail(state, action);
        default: return state;
    }
}

export default reducer;