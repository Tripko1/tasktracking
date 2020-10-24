import React, { useState } from "react";
import "./CreateNewTask.css"
import background from "../../../../assets/images/s3.jpg";
import cancel from "../../../../assets/images/icon/icons8-delete-48.png";
import Button from "../../../../components/UI/Button/Button";

const CreateNewTask = props => {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [touched, setTouched] = useState(false);
    const [touchedDesc, setTouchedDesc] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validDesc, setValidDesc] = useState(false);

    const submitCreateTaskHandler = (event) => {
        event.preventDefault();
        const index = props.checklists.findIndex(el => el.id === props.checklistId)

        const data = {
            token: props.token,
            project_id: props.project_id,
            checklist_id: props.checklistId,
            checklist: props.checklists[index],
            title: taskName,
            description: description
        }
        props.onCreateList(data)
        props.closeModal();
    }

    const isTouched = (value) => {
        return value.trim() !== ""
    }

    const isValid = (value) => {
        return value.length >= 3;
    }

    const handleInput = (event) => {
        setTaskName(event.target.value);
        setTouched(isTouched(event.target.value));
        setValidName(isValid(event.target.value));
    }

    const handleDescription = (event) => {
        setDescription(event.target.value);
        setTouchedDesc(isTouched(event.target.value));
        setValidDesc(isValid(event.target.value));
    }

    return (
        <form onSubmit={submitCreateTaskHandler}>
            <div className="CreateTask" style={{ marginTop: "25px" }}>
                <div
                    className="create-task-tile"
                    style={{
                        backgroundImage: `url(${background})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100%"
                    }}>
                    <div onClick={props.closeModal} style={{ cursor: "pointer" }}>
                        <img src={cancel} alt="" className="cancel-create-task" />
                    </div>
                    <div className="create-task-tile-input">
                        <input
                            className="create-task-tile-input-element"
                            placeholder="Add board title"
                            value={taskName}
                            onChange={handleInput}
                        />
                        <textarea
                            className="create-task-tile-input-element"
                            style={{ resize: "none" }}
                            placeholder="Description"
                            value={description}
                            onChange={handleDescription}
                        />
                    </div>
                </div>
            </div>
            <div className="create-project-tile-button">
                <Button btnType="Success" disabled={!(touched && touchedDesc && validName && validDesc)}>Create Task</Button>
            </div>
        </form>
    )
}

export default CreateNewTask;