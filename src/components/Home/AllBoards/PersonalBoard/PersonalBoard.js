import React from "react";
import "./PersonalBoard.css";
import { withRouter } from "react-router-dom"

import background from "../../../../assets/images/pro2.jpg";
import image from "../../../../assets/images/user.png";
import plus from "../../../../assets/images/icon/add-icon.png";

const personalBoard = props => {
    const projectSelectedHandler = (id, name) => {
        props.history.push("/" + id + "/" + name);
    }
    const personalBoard = props.projects.map(project => {
        return (
            <li
                key={project.id}
                style={{
                    height: "80px",
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%"
                }}
                className="board-selection-list-item"
            >
                <div
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={() => projectSelectedHandler(project.id, project.title)}
                >
                    <div className="board-title-details">
                        <div className="board-title-details-name">
                            {project.title}
                        </div>
                    </div>
                </div>
            </li >
        )
    })
    return (
        <div className="PersonalBoard">
            <div className="board-selection-header">
                <div className="board-selection-header-icon">
                    <span className="board-selection-header-icon-color">
                        <img src={image} alt="Personal Board" />
                    </span>
                </div>
                <h3>Personal Board</h3>
            </div>
            <ul className="board-selection-list">
                {personalBoard}
                <li className="board-selection-list-item" style={{ cursor: "pointer" }} onClick={props.openModal}>
                    <div className="board-title-details">
                        <div style={{ textAlign: "center" }} className="board-title-details-name-create">
                            Create new board
                            <span className="board-title-details-icon-color">
                                <img src={plus} alt="creacte project" />
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}
export default withRouter(personalBoard);