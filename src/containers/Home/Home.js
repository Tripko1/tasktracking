import React, { useState, useEffect, useCallback } from 'react';
import "./Home.css";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Auxiliary/Auxiliary"
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal"
import { useSelector, useDispatch } from 'react-redux';
import LeftHomeSider from "../../components/Home/LeftHomeSider/LeftHomeSider";
import PersonalBoard from "../../components/Home/AllBoards/PersonalBoard/PersonalBoard";
import CreateProject from "./Project/CreateProject/CreateProject";

const Home = props => {
    const [show, setShow] = useState(false);

    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const projects = useSelector(state => state.myProjects.myProjects);
    const loadingProjects = useSelector(state => state.myProjects.loadingProjects);

    const dispatch = useDispatch();
    const onGetUserData = useCallback((token, userId) => dispatch(actions.getUserData(token, userId)),[dispatch]);
    const onGetAllUsers = useCallback((token) => dispatch(actions.getAllUsers(token)),[dispatch]);
    const onGetMyProjects = useCallback((token) => dispatch(actions.getMyProjects(token)),[dispatch]);
    const onCreateProject = (token, title) => dispatch(actions.createProject(token, title));

    // constructor(props) {
    //     super(props)
    //     // window.io = require('socket.io-client');
    //     const echo = new Echo({
    //         broadcaster: 'socket.io',
    //         host: "http://localhost:6001",
    //         auth: {
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json",
    //                 Authorization: "Bearer " + this.props.token
    //             }
    //         },
    //         client: socketio
    //     });
    //     echo.private('project13')
    //         .listen("ChecklistCreatedEvent", e => {
    //             console.log(e);
    //         })
    // }

    useEffect(() => {
        onGetMyProjects(token);
        onGetUserData(token, userId);
        onGetAllUsers(token);
    },[onGetMyProjects, onGetUserData, onGetAllUsers, token, userId]);

    const openModal = () => {
        setShow(true);
    }

    const closeModal = () => {
        setShow(false);
    }

    let Homecontent = <Spinner />;
    let modalCreateProject = null;

    if (!loadingProjects) {
        Homecontent = (
            <Aux>
                <LeftHomeSider />
                <div className="allBoards">
                    <div style={{ position: "sticky", top: "0px" }}>
                        <PersonalBoard
                            projects={projects}
                            show={show}
                            openModal={openModal}
                            closeModal={closeModal}
                        />
                    </div>
                </div>
            </Aux>
        );
    }

    if (show) {
        modalCreateProject = (
            <Modal
                show={show}
                cancelModalHandler={closeModal}
            >
                <CreateProject
                    closeModal={closeModal}
                    token={token}
                    onCreateProject={onCreateProject}
                />
            </Modal>
        )
    }

    return (
        <div className="Home">
            {/* {error} */}
            {Homecontent}
            {modalCreateProject}
        </div>
    )
}

export default Home;