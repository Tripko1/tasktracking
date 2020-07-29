import React, { Component } from "react";
import "./CreateProject.css"
import background from "../../../../assets/images/slika2.jpg";
import cancel from "../../../../assets/images/icon/cancel.png";
import Button from "../../../../components/UI/Button/Button";

class CreateProject extends Component {
    state = {
        projectName: "",
        touched: false,
    }

    submitCreatProjectHandler = (event) => {
        event.preventDefault();
        this.props.onCreateProject(this.props.token, this.state.projectName);
        this.props.closeModal();
    }

    isTouched(value) {
        return value.trim() !== ""
    }

    handleInput = (event) => {
        this.setState({
            projectName: event.target.value,
            touched: this.isTouched(event.target.value)
        })
    }

    render() {
        return (
            <form onSubmit={this.submitCreatProjectHandler}>
                <div className="CreateProject">
                    <div className="create-project-tile" style={{ backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat" }}>
                        <div onClick={this.props.closeModal} style={{ cursor: "pointer" }}>
                            <img src={cancel} alt="" className="cancel-create-project" />
                        </div>
                        <div className="create-project-tile-input">
                            <input
                                className="create-project-tile-input-element"
                                placeholder="Add board title"
                                value={this.state.projectName}
                                onChange={this.handleInput}
                                ref={input => input && input.focus()}
                            />
                        </div>
                    </div>
                </div>
                <div className="create-project-tile-button">
                    <Button btnType="Success" disabled={!this.state.touched}>Create Board</Button>
                </div>
            </form>
        )
    }
}

export default CreateProject;