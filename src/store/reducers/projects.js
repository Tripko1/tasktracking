import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    myProjects: [],
    loadingProjects: false,
    loadinCheckLists: false,
    loadedChecklists: null
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

const allCheckListsStart = (state, action) => {
    return updateObject(state, { loadinCheckLists: true })
}

const allCheckListsSuccess = (state, action) => {
    return updateObject(state, { loadinCheckLists: false })
}

const allCheckListsFail = (state, action) => {
    return updateObject(state, { loadinCheckLists: false })
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
        case actionTypes.GET_ALL_CHECKLIST_START:
            return allCheckListsStart(state, action);
        case actionTypes.GET_ALL_CHECKLIST_SUCCESS:
            return allCheckListsSuccess(state, action);
        case actionTypes.GET_ALL_CHECKLIST_FAIL:
            return allCheckListsFail(state, action);
        default: return state;
    }
}

export default reducer;