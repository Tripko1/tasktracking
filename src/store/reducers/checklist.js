import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility"

const InitialState = {
    checklists: [],
    loadingChecklists: false,
    loadingChecklist: null,
    error: null,
    loadingTasks: false,
    loadingStatus: false
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
    const newChecklist = updateObject(action.checklists, {
        id: action.id,
        title: action.title,
        tasks: { data: [] }
    });
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
    const elementsIndex = state.checklists.findIndex(element => element.id === action.data.id)
    const data = [...state.checklists[elementsIndex].tasks.data]
    const tasks = updateObject(state.checklists[elementsIndex].tasks, { data: data })
    let newArray = [...state.checklists];
    const updateChecklist = updateObject(action.checklists, {
        id: action.data.id,
        title: action.data.title,
        tasks: tasks,
        tasks_count: action.data.tasks_count
    });
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

const creTaskStart = (state, action) => {
    return updateObject(state, { loadingChecklist: action.id })
}

const creTaskSuccess = (state, action) => {
    const index = state.checklists.findIndex(el => el.id === action.checklist.id);

    const newTask = updateObject(state.checklists[index].tasks.data, {
        id: action.data.id,
        title: action.data.title,
        description: action.data.description
    });

    const updateData = updateObject(state.checklists[index].tasks, {
        data: state.checklists[index].tasks.data.concat(newTask)
    })

    const updateChecklist = updateObject(state.checklists, {
        tasks: updateData,
        id: action.checklist.id,
        title: action.checklist.title,
        tasks_count: action.checklist.tasks_count
    })

    let checklists = [...state.checklists]
    checklists[index] = updateChecklist

    return updateObject(state, {
        loadingChecklist: null,
        checklists: checklists
    })
}

const creTaskFail = (state, action) => {
    return updateObject(state, { loadingChecklist: null, error: action.error })
}

const dndStart = (state, action) => {
    return updateObject(state, { loadingStatus: true })
}

const dndUpdate = (state, action) => {
    const updateIndex = state.checklists.findIndex(el => el.id === action.data.newChecklistId);
    const deleteIndex = state.checklists.findIndex(el => el.id === action.data.oldChecklistId);
    let checklists = [...state.checklists];

    if (updateIndex !== deleteIndex) {
        const newData = state.checklists[deleteIndex].tasks.data.filter(
            el => el.id !== action.data.taskId
        );

        const newTasks = updateObject(state.checklists[deleteIndex].tasks, {
            ...state.checklists[deleteIndex].tasks,
            data: newData
        })
        const deleteChecklists = updateObject(state.checklists[deleteIndex], {
            ...state.checklists[deleteIndex],
            tasks: newTasks,
            tasks_count: state.checklists[deleteIndex].tasks_count - 1
        })
        checklists[deleteIndex] = deleteChecklists

        const newTask = {
            id: action.response.id,
            title: action.response.title,
            description: action.response.description
        }

        state.checklists[updateIndex].tasks.data.splice(action.data.position, 0, newTask)

        const data1 = { ...state.checklists[updateIndex].tasks }
        const updateChecklist = updateObject(state.checklists[updateIndex], {
            ...state.checklists[updateIndex],
            tasks: data1,
            tasks_count: state.checklists[updateIndex].tasks_count + 1
        })
        checklists[updateIndex] = updateChecklist
    }
    else {
        let ind = state.checklists[updateIndex].tasks.data.findIndex(el => el.id === action.data.taskId)
        let data = [...state.checklists[updateIndex].tasks.data]
        let pom = data[ind];
        data.splice(ind, 1);
        data.splice(action.data.position, 0, pom);

        const updTask = updateObject(state.checklists[updateIndex].tasks, {
            ...state.checklists[updateIndex].tasks,
            data: data
        })
        const checklist = updateObject(state.checklists[updateIndex], {
            ...state.checklists[updateIndex],
            tasks: updTask
        })

        checklists[updateIndex] = checklist;
    }

    //console.log(checklists)

    return updateObject(state, {
        loadingStatus: false,
        //checklists: checklists
    })
}

const dndFail = (state, action) => {
    return updateObject(state, { loadingStatus: false, error: action.error })
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
        case actionTypes.CREATE_TASK_START:
            return creTaskStart(state, action);
        case actionTypes.CREATE_TASK_SUCCESS:
            return creTaskSuccess(state, action);
        case actionTypes.CREATE_TASK_FAIL:
            return creTaskFail(state, action);
        case actionTypes.CHANGE_CHECKLIST_START:
            return dndStart(state, action);
        case actionTypes.CHANGE_CHECKLIST_SUCCESS:
            return dndUpdate(state, action);
        case actionTypes.CHANGE_CHECKLIST_FAIL:
            return dndFail(state, action);
        default: return state;
    }
}

export default reducer;