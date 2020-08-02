import React, { Component } from "react";
import "./Project.css";
import * as actions from "../../../store/actions/index";
import Header from "../../../components/SelectedProject/Header/Header";
import Board from "./Board/Board";
import image from "../../../assets/images/pro2.jpg";

import { connect } from "react-redux";

class Project extends Component {
    state = {
        projectName: this.props.match.params.projectName,
        touchedProjectName: true
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

    componentDidUpdate() {
        this.loadData();
    }

    loadData = () => {
        if (this.props.match.params.projectId) {
            if (
                !this.props.loadedChecklists ||
                (this.props.loadedChecklists &&
                    this.props.loadedChecklists.id !== +this.props.match.params.id)
            ) {
                //this.props.onGetAllChecklists(this.props.token, this.props.match.params.projectId)
            }
        }
    }

    handleProjectName = (event) => {
        this.setState({
            projectName: event.target.value
        })
    }

    submitEditProject = (event) => {
        event.preventDefault()
        console.log("aaa")
    }

    render() {
        return (
            <div
                className="Project"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%"
                }}>
                <Header
                    projectName={this.state.projectName}
                    handleProjectName={this.handleProjectName}
                    touchedProjectName={this.state.touchedProjectName}
                    submitEditProject={this.submitEditProject}
                />
                <Board />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        loadedChecklists: state.myProjects.loadedChecklists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAllChecklists: (token, id) => dispatch(actions.getAllChecklist(token, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);