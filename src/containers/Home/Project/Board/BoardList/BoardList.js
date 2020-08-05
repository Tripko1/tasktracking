import React, { Component } from 'react';
import "./BoardList.css";
import edit from "../../../../../assets/images/icon/icons8-edit-48.png";
import Button from "../../../../../components/UI/Button/Button";
import Card from "./BoardCardItem/BoardCardItem";
import Spinner from "../../../../../components/UI/Spinner/Spinner";
import Aux from "../../../../../hoc/Auxiliary/Auxiliary";
import deleteBtn from "../../../../../assets/images/icon/icons8-delete-48.png"

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
                <div className="board-list-card">
                    <Card name="Card1" />
                    <Card name="Card2" />
                    <Card name="Card3" />
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