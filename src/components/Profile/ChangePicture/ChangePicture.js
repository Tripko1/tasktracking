import React, { useRef } from "react";
import "./ChangePicture.css";
import Avatar from "react-avatar";
import Button from "../../UI/Button/Button";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const ChangePicture = props => {
    const inputElement = useRef();
    let img = (
        <Aux>
            <div className="changeImage">
                <Avatar
                    src={props.userData.img}
                    round={true}
                    name={props.userData.name + " " + props.userData.username}
                />
                <input
                    style={{ display: "none" }}
                    type="file"
                    onChange={props.fileSelectedHandler}
                    ref={inputElement}
                />
            </div>
            <div className="changeImage">
                <Button btnType="Submit" clicked={() => inputElement.current.click()}>Choose Image</Button>
            </div>
        </Aux>
    )

    if (props.selectedImage) {
        img = (
            <Aux>
                <div className="changeImage">
                    <img src={props.selectedImage} alt={props.userData.username} className="insertImage" />
                </div>
                <div className="changeImage">
                    <Button btnType="Cancel" clicked={props.cancelImageHandler}>Cancel</Button>
                    <Button btnType="Submit" clicked={props.upload}>Upload</Button>
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

export default ChangePicture;