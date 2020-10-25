import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
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

    const token = useSelector(state => state.auth.token);
    const userId = useSelector(state => state.auth.userId);
    const loading = useSelector(state => state.userData.loading);
    const userData = useSelector(state => state.userData.userData);

    const dispatch = useDispatch();
    const onGetUserData = useCallback((token, userId) => dispatch(actions.getUserData(token, userId)),[dispatch]);
    const onUploadImage = useCallback((token, img) => dispatch(actions.uploadImage(token, img)),[dispatch]);

    useEffect(() => {
        onGetUserData(token, userId);
    },[onGetUserData, token, userId]);

    const upload = () => {
        onUploadImage(token, selectedFile);
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
    if (!loading) {
        content = (
            <Aux>
                <div className="Header">
                    <Avatar
                        size="44"
                        round={true}
                        src={userData.img}
                        name={userData.name + " " + userData.username}
                        border={50}
                    />
                    <div className="Header-item"><strong>{userData.name + " " + userData.username}</strong></div>
                    <div className="Header-item">{userData.email}</div>
                </div>
                <ChangePicture
                    userData={userData}
                    fileSelectedHandler={fileSelectedHandler}
                    selectedImage={selectedImage}
                    selectedFile={selectedFile}
                    cancelImageHandler={cancelImageHandler}
                    upload={upload}
                />
                <ChangeProfileData
                    userData={userData}
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

export default Profile;