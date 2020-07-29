import React, { Component } from 'react';
import "./Home.css";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Auxiliary/Auxiliary"
import Spinner from "../../components/UI/Spinner/Spinner";
import Modal from "../../components/UI/Modal/Modal"
import { connect } from 'react-redux';
import LeftHomeSider from "../../components/Home/LeftHomeSider/LeftHomeSider";
import PersonalBoard from "../../components/Home/AllBoards/PersonalBoard/PersonalBoard";
import CreateProject from "./Project/CreateProject/CreateProject";
class Home extends Component {
    state = {
        show: false
    }
    componentDidMount() {
        this.props.onGetMyProjects(this.props.token);
        this.props.onGetUserData(this.props.token, this.props.userId);
        this.props.onGetAllUsers(this.props.token);
    }

    openModal = () => {
        this.setState({ show: true })
    }

    closeModal = () => {
        this.setState({ show: false })
    }

    render() {
        let Homecontent = <Spinner />;
        let modalCreateProject = null;
        //let error = null;

        if (!this.props.loadingProjects) {
            Homecontent = (
                <Aux>
                    <LeftHomeSider />
                    <div className="allBoards">
                        <div style={{ position: "sticky", top: "0px" }}>
                            <PersonalBoard
                                projects={this.props.projects}
                                show={this.state.show}
                                openModal={this.openModal}
                                closeModal={this.closeModal}
                            />
                        </div>
                    </div>
                </Aux>
            );
        }

        if (this.state.show) {
            modalCreateProject = (
                <Modal
                    show={this.state.show}
                    cancelModalHandler={this.closeModal}
                >
                    <CreateProject
                        closeModal={this.closeModal}
                        token={this.props.token}
                        onCreateProject={this.props.onCreateProject}
                    />
                </Modal>
            )
        }

        // if (this.props.error) {
        //     error = <h1 style={{ textAlign: "center" }}><strong>{this.props.error}</strong></h1>;
        // }

        return (
            <div className="Home">
                {/* {error} */}
                {Homecontent}
                {modalCreateProject}
            </div>
        )
    }
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