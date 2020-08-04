import React, { Component } from "react";
import background from "../../../../assets/images/slika2.jpg";
import cancel from "../../../../assets/images/icon/cancel.png";
import Button from "../../../../components/UI/Button/Button";

class CreateChecklist extends Component {
    state = {
        checklistName: "",
        touched: false,
    }

    submitCreateChecklistHandler = (event) => {
        event.preventDefault();
        this.props.onCreateChecklist(this.props.token, this.state.checklistName, this.props.project_id);
        this.props.closeModal();
    }

    isTouched(value) {
        return value.trim() !== ""
    }

    handleInput = (event) => {
        this.setState({
            checklistName: event.target.value,
            touched: this.isTouched(event.target.value)
        })
    }

    render() {
        return (
            <form onSubmit={this.submitCreateChecklistHandler}>
                <div className="CreateProject">
                    <div
                        className="create-project-tile"
                        style={{
                            backgroundImage: `url(${background})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "100% 100%"
                        }}>
                        <div onClick={this.props.closeModal} style={{ cursor: "pointer" }}>
                            <img src={cancel} alt="" className="cancel-create-project" />
                        </div>
                        <div className="create-project-tile-input">
                            <input
                                className="create-project-tile-input-element"
                                placeholder="Add checkout title"
                                value={this.state.checklistName}
                                onChange={this.handleInput}
                                ref={input => input && input.focus()}
                            />
                        </div>
                    </div>
                </div>
                <div className="create-project-tile-button">
                    <Button btnType="Success" disabled={!this.state.touched}>Create Checkout</Button>
                </div>
            </form>
        )
    }
}

export default CreateChecklist;