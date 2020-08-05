import React, { Component } from "react";
import "./CreateNewTask.css"
import background from "../../../../assets/images/s3.jpg";
import cancel from "../../../../assets/images/icon/icons8-delete-48.png";
import Button from "../../../../components/UI/Button/Button";

class createNewTask extends Component {
    state = {
        taskName: "",
        description: "",
        touched: false,
        touchedDesc: false,
    }

    submitCreateTaskHandler = (event) => {
        event.preventDefault();
        const index = this.props.checklists.findIndex(el => el.id === this.props.checklistId)
        console.log(index)
        const data = {
            token: this.props.token,
            project_id: this.props.project_id,
            checklist_id: this.props.checklistId,
            checklist: this.props.checklists[index],
            title: this.state.taskName,
            description: this.state.description
        }
        this.props.onCreateList(data)
        this.props.closeModal();
    }

    isTouched(value) {
        return value.trim() !== ""
    }

    handleInput = (event) => {
        this.setState({
            taskName: event.target.value,
            touched: this.isTouched(event.target.value)
        })
    }

    handleDescription = (event) => {
        this.setState({
            description: event.target.value,
            touchedDesc: this.isTouched(event.target.value)
        })
    }

    render() {
        return (
            <form onSubmit={this.submitCreateTaskHandler}>
                <div className="CreateTask" style={{ marginTop: "25px" }}>
                    <div
                        className="create-task-tile"
                        style={{
                            backgroundImage: `url(${background})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100% 100%"
                        }}>
                        <div onClick={this.props.closeModal} style={{ cursor: "pointer" }}>
                            <img src={cancel} alt="" className="cancel-create-task" />
                        </div>
                        <div className="create-task-tile-input">
                            <input
                                className="create-task-tile-input-element"
                                placeholder="Add board title"
                                value={this.state.taskName}
                                onChange={this.handleInput}
                            />
                            <textarea
                                className="create-task-tile-input-element"
                                style={{ resize: "none" }}
                                placeholder="Description"
                                value={this.state.description}
                                onChange={this.handleDescription}
                            />
                        </div>
                    </div>
                </div>
                <div className="create-project-tile-button">
                    <Button btnType="Success" disabled={!(this.state.touched && this.state.touchedDesc)}>Create Task</Button>
                </div>
            </form>
        )
    }
}

export default createNewTask;