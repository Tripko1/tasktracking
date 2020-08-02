import React from "react";
import "./Header.css";
import Button from "../../UI/Button/Button";
import edit from "../../../assets/images/icon/icons8-edit-48.png";


const header = (props) => {
    return (
        <div className="board-header">
            <div className="board-header-btn">
                <form onSubmit={props.submitEditProject} className="board-header-form">
                    <input
                        className="board-name-input"
                        placeholder="Add board title"
                        value={props.projectName}
                        onChange={props.handleProjectName}
                    />
                    <Button
                        btnType="Success"
                        disabled={props.touchedProjectName}
                    >
                        <img src={edit} alt="Edit Project name" style={{ height: "20px", width: "20px" }} />
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default header;