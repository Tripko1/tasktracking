import React, { Component } from "react";
import "./Board.css";
import BoardList from "./BoardList/BoardList";

class Board extends Component {
    render() {
        return (
            <div className="board">
                <BoardList checklistName="Things to do..." />
                <BoardList checklistName="Doing" />
                <BoardList checklistName="Done" />
            </div>
        )
    }
}

export default Board;