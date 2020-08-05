import React, { Component } from "react";
import "./Project.css";
import * as actions from "../../../store/actions/index";
import Header from "../../../components/SelectedProject/Header/Header";
import Board from "./Board/Board";
import image from "../../../assets/images/pro2.jpg";
import Modal from "../../../components/UI/Modal/Modal";
import Spinner from "../../../components/UI/Spinner/Spinner";
import CreateChecklist from "./CreateChecklist/CreateChecklist";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { connect } from "react-redux";

class Project extends Component {
    state = {
        projectName: this.props.match.params.projectName,
        touchedProjectName: true,
        show: false
    }

    static getDerivedStateFromProps = (props, state) => {
        if (state.projectName !== props.match.params.projectName) {
            return { touchedProjectName: false }
        }
        else {
            return { touchedProjectName: true }
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        if (this.props.match.params.projectId) {
            if (
                !this.props.checklists ||
                (this.props.checklists &&
                    this.props.checklists.id !== +this.props.match.params.id)
            ) {
                this.props.onGetAllChecklists(this.props.token, this.props.match.params.projectId)
            }
        }
    }

    openModal = () => {
        this.setState({ show: true })
    }
    closeModal = () => {
        this.setState({ show: false })
    }

    handleProjectName = (event) => {
        this.setState({
            projectName: event.target.value
        })
    }

    submitEditProject = (event) => {
        event.preventDefault()
        console.log("[SUBMIT EDIT PROJECT]")
    }

    render() {
        let modal = null;
        if (this.state.show) {
            modal = (
                <Modal
                    show={this.state.show}
                    cancelModalHandler={this.closeModal}
                >
                    <CreateChecklist
                        closeModal={this.closeModal}
                        token={this.props.token}
                        onCreateChecklist={this.props.onCreateChecklist}
                        project_id={this.props.match.params.projectId}
                    />
                </Modal>
            )
        }
        let content = <Spinner />;
        if (!this.props.loading) {
            content = (
                <Aux>
                    {modal}
                    <Header
                        projectName={this.state.projectName}
                        handleProjectName={this.handleProjectName}
                        touchedProjectName={this.state.touchedProjectName}
                        submitEditProject={this.submitEditProject}
                    />
                    <Board
                        token={this.props.token}
                        show={this.state.show}
                        openModal={this.openModal}
                        closeModal={this.closeModal}
                        checklists={this.props.checklists}
                        loadingChecklist={this.props.loadingChecklist}
                        onUpdateChecklist={this.props.onUpdateChecklist}
                        onDeleteChecklist={this.props.onDeleteChecklist}
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
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        checklists: state.checklists.checklists,
        loading: state.checklists.loadingChecklists,
        loadingChecklist: state.checklists.loadingChecklist
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllChecklists: (token, id) => dispatch(actions.getAllChecklist(token, id)),
        onCreateChecklist: (token, title, id) => dispatch(actions.createChecklist(token, title, id)),
        onUpdateChecklist: (token, title, id) => dispatch(actions.updateChecklist(token, title, id)),
        onDeleteChecklist: (token, id) => dispatch(actions.delteChecklist(token, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);