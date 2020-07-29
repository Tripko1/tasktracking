import React, { Component } from "react";
import "./ChangePicture.css";
import Avatar from "react-avatar";
import Button from "../../UI/Button/Button";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

class changePicture extends Component {
    render() {
        let img = (
            <Aux>
                <div className="changeImage">
                    <Avatar
                        src={this.props.userData.img}
                        round={true}
                        name={this.props.userData.name + " " + this.props.userData.username}
                    />
                    <input
                        style={{ display: "none" }}
                        type="file"
                        onChange={this.props.fileSelectedHandler}
                        ref={input => this.inputElement = input}
                    />
                </div>
                <div className="changeImage">
                    <Button btnType="Submit" clicked={() => this.inputElement.click()}>Choose Image</Button>
                </div>
            </Aux>
        )

        if (this.props.selectedImage) {
            img = (
                <Aux>
                    <div className="changeImage">
                        <img src={this.props.selectedImage} alt={this.props.userData.username} className="insertImage" />
                    </div>
                    <div className="changeImage">
                        <Button btnType="Cancel" clicked={this.props.cancelImageHandler}>Cancel</Button>
                        <Button btnType="Submit" clicked={this.props.upload}>Upload</Button>
                    </div>
                </Aux>
            )
        }

        return (
            <div className="ChangePicture">
                {img}
            </div>
        )
    }
}

export default changePicture;