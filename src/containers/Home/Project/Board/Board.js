import React, { Component } from "react";
import "./Board.css";
import BoardList from "./BoardList/BoardList";
import Create from "../../../../components/SelectedProject/CreateCheckList/CreateCheckList";

class Board extends Component {

    render() {
        const board_list = this.props.checklists.map(checklist => (
            <BoardList
                key={checklist.id}
                checklistName={checklist.title}
                checklistId={checklist.id}
                token={this.props.token}
                loadingChecklist={this.props.loadingChecklist}
                onUpdateChecklist={this.props.onUpdateChecklist}
                onDeleteChecklist={this.props.onDeleteChecklist}
            />
        ))
        return (
            <div className="board">
                {board_list}
                <Create
                    show={this.props.show}
                    openModal={this.props.openModal}
                />
            </div>
        )
    }
}

export default Board;