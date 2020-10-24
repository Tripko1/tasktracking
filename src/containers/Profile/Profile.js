import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Avatar from "react-avatar";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import ChangePicture from "../../components/Profile/ChangePicture/ChangePicture";
import ChangeProfileData from "../../components/Profile/ChangeProfileData/ChangeProfileData";

import "./Profile.css"

const Profile = props => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const setImageError = useState(false)[1];
    const setImageErrorMessage = useState(null)[1];

    const {onGetUserData, token, userId} = props;
    useEffect(() => {
        onGetUserData(token, userId);
    },[onGetUserData, token, userId]);

    const upload = () => {
        props.onUploadImage(token, selectedFile);
        cancelImageHandler();
    }

    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            cb(reader.result);
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
        };
    };

    const fileSelectedHandler = event => {
        const file = event.target.files[0];
        if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(file.name)) {
            getBase64(file, result => {
                setSelectedImage(result);
                setImageError(false);
                setSelectedFile(file);
            });
        } else {
            setImageError(true);
            setImageErrorMessage("File type is not image.");
        }
    };

    const cancelImageHandler = () => {
        setSelectedImage(null);
        setSelectedFile(null);
    }

    let content = <Spinner />;
    if (!props.loading) {
        content = (
            <Aux>
                <div className="Header">
                    <Avatar
                        size="44"
                        round={true}
                        src={props.userData.img}
                        name={props.userData.name + " " + props.userData.username}
                        border={50}
                    />
                    <div className="Header-item"><strong>{props.userData.name + " " + props.userData.username}</strong></div>
                    <div className="Header-item">{props.userData.email}</div>
                </div>
                <ChangePicture
                    userData={props.userData}
                    fileSelectedHandler={fileSelectedHandler}
                    selectedImage={selectedImage}
                    selectedFile={selectedFile}
                    cancelImageHandler={cancelImageHandler}
                    upload={upload}
                />
                <ChangeProfileData
                    userData={props.userData}
                />
            </Aux>
        )
    }
    return (
        <div className="Profile">
            {content}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        loading: state.userData.loading,
        error: state.userData.error,
        userData: state.userData.userData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetUserData: (token, userId) => dispatch(actions.getUserData(token, userId)),
        onUploadImage: (token, img) => dispatch(actions.uploadImage(token, img))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);