import React from "react";
import "./BoardCardItem.css"

const boardCardItem = props => {

    const dragStart = e => {
        const target = e.target;
        e.dataTransfer.setData('card_id', target.id);
    }

    const dragOver = e => {
        e.stopPropagation();
    }
    return (
        <div
            id={props.task.id + " " + props.checklistId}
            className="board-list-card-item"
            onDragStart={dragStart}
            onDragOver={dragOver}
            draggable="true"
            onClick={() => console.log("aaaa")}
        >
            <div className="board-list-card-item-name">
                <div><strong>{props.task.title}</strong></div>
            </div>
        </div>
    )
}

export default boardCardItem;