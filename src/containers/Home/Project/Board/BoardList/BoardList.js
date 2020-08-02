import React, { Component } from 'react';
import "./BoardList.css";
import edit from "../../../../../assets/images/icon/icons8-edit-48.png";
import Button from "../../../../../components/UI/Button/Button";
import Card from "./BoardCardItem/BoardCardItem";

class BoardList extends Component {
    render() {
        return (
            <div className="board-list">
                <div className="board-list-content">
                    <div className="board-list-header">
                        <div className="board-list-header-choose">
                            <div>{this.props.checklistName}</div>
                            <form className="board-list-form">
                                <input
                                    className="board-list-input"
                                    placeholder="Add board title"
                                    value={this.props.checklistName}
                                />
                                <Button
                                    btnType="Success"
                                >
                                    <img src={edit} alt="Edit Project name" style={{ height: "20px", width: "20px" }} />
                                </Button>
                            </form>
                        </div>
                    </div>
                    <div className="board-list-card">
                        <Card name="Card1" />
                        <Card name="Card2" />
                        <Card name="Card3" />
                    </div>
                </div>
            </div>
        )
    }
}

export default BoardList;