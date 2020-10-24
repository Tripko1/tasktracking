import React, { useState } from "react";
import background from "../../../../assets/images/slika2.jpg";
import cancel from "../../../../assets/images/icon/cancel.png";
import Button from "../../../../components/UI/Button/Button";

const CreateChecklist = props => {
    const [checklistName, setChecklistName] = useState("");
    const [touched, setTouched] = useState(false);

    const submitCreateChecklistHandler = (event) => {
        event.preventDefault();
        props.onCreateChecklist(props.token, checklistName, props.project_id);
        props.closeModal();
    }

    const isTouched = (value) => {
        return value.trim() !== ""
    }

    const handleInput = (event) => {
        setChecklistName(event.target.value);
        setTouched(isTouched(event.target.value));
    }

    return (
        <form onSubmit={submitCreateChecklistHandler}>
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
                            placeholder="Add checkout title"
                            value={checklistName}
                            onChange={handleInput}
                            ref={input => input && input.focus()}
                        />
                    </div>
                </div>
            </div>
            <div className="create-project-tile-button">
                <Button btnType="Success" disabled={!touched}>Create Checkout</Button>
            </div>
        </form>
    )
}

export default CreateChecklist;