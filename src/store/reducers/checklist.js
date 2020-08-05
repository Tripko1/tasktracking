import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility"

const InitialState = {
    checklists: [],
    loadingChecklists: false,
    loadingChecklist: null,
    error: null
}

const allCheckListsStart = (state, action) => {
    return updateObject(state, { loadingChecklists: true })
}

const allCheckListsSuccess = (state, action) => {
    return updateObject(state, { loadingChecklists: false, checklists: action.checklists })
}

const allCheckListsFail = (state, action) => {
    return updateObject(state, { loadingChecklists: false, error: action.error })
}

const createCheStart = (state, action) => {
    return updateObject(state, { loadingChecklists: true })
}

const createCheSuccess = (state, action) => {
    const newChecklist = updateObject(action.checklists, { id: action.id, title: action.title });
    return updateObject(state, {
        loadingChecklists: false,
        checklists: state.checklists.concat(newChecklist)
    })
}

const createCheFail = (state, action) => {
    return updateObject(state, { loadingChecklists: false, error: action.error })
}

const updateCheStart = (state, action) => {
    return updateObject(state, { loadingChecklist: action.id })
}

const updateCheSuccess = (state, action) => {
    const elementsIndex = state.checklists.findIndex(element => element.id === action.id)
    let newArray = [...state.checklists];
    const updateChecklist = updateObject(action.checklists, { id: action.id, title: action.title });
    newArray[elementsIndex] = updateChecklist;

    return updateObject(state, {
        loadingChecklist: null,
        checklists: newArray
    })
}

const updateCheFail = (state, action) => {
    return updateObject(state, { loadingChecklist: null, error: action.error })
}

const deleteCheStart = (state, action) => {
    return updateObject(state, { loadingChecklists: true })
}

const deleteCheSuccess = (state, action) => {
    const newChecklist = state.checklists.filter(
        checklist => checklist.id !== action.id
    );
    return updateObject(state, {
        loadingChecklists: false,
        checklists: newChecklist
    })
}

const deleteCheFail = (state, action) => {
    return updateObject(state, { loadingChecklists: false, error: action.error })
}


const reducer = (state = InitialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CHECKLIST_START:
            return allCheckListsStart(state, action);
        case actionTypes.GET_ALL_CHECKLIST_SUCCESS:
            return allCheckListsSuccess(state, action);
        case actionTypes.GET_ALL_CHECKLIST_FAIL:
            return allCheckListsFail(state, action);
        case actionTypes.CREATE_CHECKLIST_START:
            return createCheStart(state, action);
        case actionTypes.CREATE_CHECKLIST_SUCCESS:
            return createCheSuccess(state, action);
        case actionTypes.CREATE_CHECKLIST_FAIL:
            return createCheFail(state, action);
        case actionTypes.UPDATE_CHECKLIST_START:
            return updateCheStart(state, action);
        case actionTypes.UPDATE_CHECKLIST_SUCCESS:
            return updateCheSuccess(state, action);
        case actionTypes.UPDATE_CHECKLIST_FAIL:
            return updateCheFail(state, action);
        case actionTypes.DELETE_CHECKLIST_START:
            return deleteCheStart(state, action);
        case actionTypes.DELETE_CHECKLIST_SUCCESS:
            return deleteCheSuccess(state, action);
        case actionTypes.DELETE_CHECKLIST_FAIL:
            return deleteCheFail(state, action);
        default: return state;
    }
}

export default reducer;