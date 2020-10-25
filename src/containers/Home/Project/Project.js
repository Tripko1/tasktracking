import React, { useState, useEffect, useCallback } from "react";
import "./Project.css";
import * as actions from "../../../store/actions/index";
import Header from "../../../components/SelectedProject/Header/Header";
import Board from "./Board/Board";
import image from "../../../assets/images/backgr2.jpg";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";
import CreateChecklist from "./CreateChecklist/CreateChecklist";
import CreateNewTask from "./CreateNewTask/CreateNewTask";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { useSelector, useDispatch } from "react-redux";

const Project = props => {
    const [projectName, setProjectName] = useState(props.match.params.projectName);
    const [touchedProjectName, setTouchedProjectName] = useState(true);
    const [show, setShow] = useState(false);
    const [showNewTask, setShowNewTask] = useState(false);
    const [selectedId, setSelectedId] = useState();

    const token = useSelector(state => state.auth.token);
    const checklists = useSelector(state => state.checklists.checklists);
    const loading = useSelector(state => state.checklists.loadingChecklists);
    const loadingChecklist = useSelector(state => state.checklists.loadingChecklist);

    const dispatch = useDispatch();
    const onCreateChecklist = useCallback((token, title, id) => dispatch(actions.createChecklist(token, title, id)),[dispatch]);
    const onUpdateChecklist = useCallback((token, title, id) => dispatch(actions.updateChecklist(token, title, id)),[dispatch]);
    const onDeleteChecklist = useCallback((token, id) => dispatch(actions.delteChecklist(token, id)),[dispatch]);
    const onGetAllChecklistsTasks = useCallback((token, checklistId) => dispatch(actions.getAllChecklistTasks(token, checklistId)),[dispatch]);
    const onCreateList = useCallback((data) => dispatch(actions.createTask(data)),[dispatch]);
    const onChangeChecklist = useCallback((checklistId, cardId, position) => dispatch(actions.changeChecklist(checklistId, cardId, position)),[dispatch]);  

    const loadData = useCallback(() => {
        if (props.match.params.projectId) {
            if (
                !checklists ||
                (checklists &&
                    checklists.id !== +props.match.params.id)
            ) {
                onGetAllChecklistsTasks(token, props.match.params.projectId)
            }
        }
    },[onGetAllChecklistsTasks, token, props.match.params.projectId, checklists.id, props.match.params.id]);

    useEffect(() => {
        if (projectName !== props.match.params.projectName) {
            setTouchedProjectName(false);
        }
        else {
            setTouchedProjectName(true);
        }
        loadData();
    },[loadData, projectName, props.match.params.projectName]);

    const openModal = () => {
        setShow(true);
    }

    const closeModal = () => {
        setShow(false);
    }

    const openTaskModal = (id) => {
        setShowNewTask(true);
        setSelectedId(id);
    }

    const closeTaskModal = () => {
        setShowNewTask(false);
        setSelectedId(null);
    }

    const handleProjectName = (event) => {
        setProjectName(event.target.value);
    }

    const submitEditProject = (event) => {
        event.preventDefault()
        console.log("[SUBMIT EDIT PROJECT]")
    }

    let modal = null;
    if (show) {
        modal = (
            <Modal
                show={show}
                cancelModalHandler={closeModal}
            >
                <CreateChecklist
                    closeModal={closeModal}
                    token={token}
                    onCreateChecklist={onCreateChecklist}
                    project_id={props.match.params.projectId}
                />
            </Modal>
        )
    }
    let taskModal = null;
    if (showNewTask) {
        taskModal = (
            <Modal
                show={showNewTask}
                cancelModalHandler={closeTaskModal}
            >
                <CreateNewTask
                    closeModal={closeTaskModal}
                    token={token}
                    project_id={props.match.params.projectId}
                    checklistId={selectedId}
                    onCreateList={onCreateList}
                    checklists={checklists}
                />
            </Modal>
        )
    }
    let content = <Spinner />;
    if (!loading) {
        content = (
            <Aux>
                {modal}
                {taskModal}
                <Header
                    projectName={projectName}
                    handleProjectName={handleProjectName}
                    touchedProjectName={touchedProjectName}
                    submitEditProject={submitEditProject}
                />
                <Board
                    token={token}
                    show={show}
                    openModal={openModal}
                    closeModal={closeModal}
                    checklists={checklists}
                    loadingChecklist={loadingChecklist}
                    onUpdateChecklist={onUpdateChecklist}
                    onDeleteChecklist={onDeleteChecklist}
                    openTaskModal={openTaskModal}
                    onChangeChecklist={onChangeChecklist}
                    projectId={props.match.params.projectId}
                />
            </Aux>
        )
    }
    return (
        <div
            className="Project"
            style={{
                backgroundImage: `url(${image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%"
            }}
        >
            {content}
        </div>

    )
}

export default Project;