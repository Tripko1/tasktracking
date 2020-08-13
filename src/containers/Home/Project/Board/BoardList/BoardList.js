import React, { Component } from 'react';
import "./BoardList.css";
import edit from "../../../../../assets/images/icon/icons8-edit-48.png";
import Button from "../../../../../components/UI/Button/Button";
import Card from "./BoardCardItem/BoardCardItem";
import Spinner from "../../../../../components/UI/Spinner/Spinner";
import Aux from "../../../../../hoc/Auxiliary/Auxiliary";
import deleteBtn from "../../../../../assets/images/icon/icons8-delete-48.png";
import plus from "../../../../../assets/images/icon/icons8-edit-node-48.png";

class BoardList extends Component {
    state = {
        checklistName: this.props.checklistName,
        touchedChecklistName: true
    }

    static getDerivedStateFromProps = (props, state) => {
        if (state.checklistName !== props.checklistName) {
            return { touchedChecklistName: false }
        }
        else {
            return { touchedChecklistName: true }
        }
    }

    inputHandler = (event) => {
        this.setState({
            checklistName: event.target.value
        })
    }

    submitUpdateChecklist = (event) => {
        event.preventDefault();
        this.props.onUpdateChecklist(this.props.token, this.state.checklistName, this.props.checklistId)
    }

    deleteChecklist = (id) => {
        this.props.onDeleteChecklist(this.props.token, id);
    }

    drop = e => {
        e.preventDefault();
        const card_id = e.dataTransfer.getData('card_id');
        const card = document.getElementById(card_id);
        card.style.display = 'block';

        const p = e.pageY - 225;
        const position = Math.floor((p / 40));

        const param = this.props.projectId + "." + this.props.checklistId;
        let list = document.getElementById(String(param))
        list.insertBefore(card, list.childNodes[position])

        const taskId = card_id.split(" ")[0];
        const cId = this.props.checklists.findIndex(el => el.id === card_id.split(" ")[1])
        const index = this.props.checklists[cId].tasks.data.findIndex(el => el.id === taskId);

        const data = {
            newChecklistId: this.props.checklistId,
            oldChecklistId: card_id.split(" ")[1],
            title: this.props.checklists[cId].tasks.data[index].title,
            desc: this.props.checklists[cId].tasks.data[index].description,
            taskId: taskId,
            position: position
        }

        this.props.onChangeChecklist(this.props.token, data);
    }

    dragOver = e => {
        e.preventDefault();
    }

    render() {
        let header = (
            <Aux>
                <div style={{ height: "30px" }}>
                    <img className="board-list-content-img" src={deleteBtn} alt="" onClick={() => this.deleteChecklist(this.props.checklistId)} />
                </div>
                <div className="board-list-header">
                    <div className="board-list-header-choose">
                        <div>{this.props.checklistName}</div>
                        <form onSubmit={this.submitUpdateChecklist} className="board-list-form">
                            <input
                                className="board-list-input"
                                placeholder="Add checklist title"
                                onChange={this.inputHandler}
                                value={this.state.checklistName}
                            />
                            <Button
                                btnType="Success"
                                disabled={this.state.touchedChecklistName}
                            >
                                <img src={edit} alt="Edit Checklist name" style={{ height: "20px", width: "20px" }} />
                            </Button>
                        </form>
                    </div>
                </div>
                <div
                    id={this.props.projectId + "." + this.props.checklistId}
                    className="board-list-card"
                    onDrop={this.drop}
                    onDragOver={this.dragOver}
                >
                    {this.props.tasks.data.map(task =>
                        <Card
                            key={this.props.checklistId + " " + task.id}
                            task={task}
                            checklistId={this.props.checklistId}
                            onChangeChecklist={this.props.onChangeChecklist}
                        />
                    )}
                </div>
                <div className="board-list-add-task" onClick={() => this.props.openTaskModal(this.props.checklistId)}>
                    <img src={plus} alt="" style={{ height: "20px", width: "20px" }} />
                    <span style={{ marginLeft: "5px" }}>Add another card</span>
                </div>
            </Aux>
        )
        if (this.props.loadingChecklist !== null && this.props.loadingChecklist === this.props.checklistId) {
            header = <Spinner />;
        }
        return (
            <div className="board-list">
                <div className="board-list-content">
                    {header}
                </div>
            </div>
        )
    }
}

export default BoardList;