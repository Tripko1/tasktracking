import React from "react";
import "./CreateCheckList.css";
import plus from "../../../assets/images/icon/icons8-edit-node-48.png";

const createcheckList = (props) => {
    return (
        <div className="board-list">
            <div className="board-list-content" onClick={props.openModal}>
                <div className="create-checklist-check" >
                    <img src={plus} alt="" />
                    <span>Add another list</span>
                </div>
            </div>
        </div>
    )
}

export default createcheckList;