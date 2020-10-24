import React, { useState, useEffect } from 'react';
import "./Home.css";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Auxiliary/Auxiliary"
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal"
import { connect } from 'react-redux';
import LeftHomeSider from "../../components/Home/LeftHomeSider/LeftHomeSider";
import PersonalBoard from "../../components/Home/AllBoards/PersonalBoard/PersonalBoard";
import CreateProject from "./Project/CreateProject/CreateProject";

const Home = props => {
    const [show, setShow] = useState(false);

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
    const {onGetMyProjects,onGetUserData,onGetAllUsers, token, userId} = props;

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

    if (!props.loadingProjects) {
        Homecontent = (
            <Aux>
                <LeftHomeSider />
                <div className="allBoards">
                    <div style={{ position: "sticky", top: "0px" }}>
                        <PersonalBoard
                            projects={props.projects}
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
                    onCreateProject={props.onCreateProject}
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

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        loading: state.userData.loading,
        error: state.userData.error,
        userData: state.userData.userData,
        allUsers: state.users.allUsers,
        projects: state.myProjects.myProjects,
        loadingProjects: state.myProjects.loadingProjects,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetUserData: (token, userId) => dispatch(actions.getUserData(token, userId)),
        onGetAllUsers: (token) => dispatch(actions.getAllUsers(token)),
        onGetMyProjects: (token) => dispatch(actions.getMyProjects(token)),
        onCreateProject: (token, title) => dispatch(actions.createProject(token, title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);