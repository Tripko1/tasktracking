import React, { useState } from "react";
import "./CreateProject.css"
import background from "../../../../assets/images/pro2.jpg";
import cancel from "../../../../assets/images/icon/cancel.png";
import Button from "../../../../components/UI/Button/Button";

const CreateProject = props => {
    const [projectName, setProjectName] = useState("");
    const [touched, setTouched] = useState(false);

    const submitCreatProjectHandler = (event) => {
        event.preventDefault();
        props.onCreateProject(props.token, projectName);
        props.closeModal();
    }

    const isTouched = (value) => {
        return value.trim() !== ""
    }

    const handleInput = (event) => {
        setProjectName(event.target.value);
        setTouched(isTouched(event.target.value));
    }

    return (
        <form onSubmit={submitCreatProjectHandler}>
            <div className="CreateProject">
                <div
                    className="create-project-tile"
                    style={{
                        backgroundImage: `url(${background})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 100%"
                    }}>
                    <div onClick={props.closeModal} style={{ cursor: "pointer" }}>
                        <img src={cancel} alt="" className="cancel-create-project" />
                    </div>
                    <div className="create-project-tile-input">
                        <input
                            className="create-project-tile-input-element"
                            placeholder="Add board title"
                            value={projectName}
                            onChange={handleInput}
                            ref={input => input && input.focus()}
                        />
                    </div>
                </div>
            </div>
            <div className="create-project-tile-button">
                <Button btnType="Success" disabled={!touched}>Create Board</Button>
            </div>
        </form>
    )
}

export default CreateProject;