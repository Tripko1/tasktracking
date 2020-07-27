import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Avatar from "react-avatar";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import ChangePicture from "../../components/ChangePicture/ChangePicture"

import "./Profile.css"

class Profile extends Component {

    state = {
        selectedFile: null,
        selectedImage: null,
        imageError: false,
        imageErrorMessage: null,
        scale: 1.5,
    }

    componentDidMount() {
        this.props.onGetUserData(this.props.token, this.props.userId);
    }

    upload = () => {
        this.props.onUploadImage(this.props.token, this.state.selectedFile);
        this.cancelImageHandler()
    }

    getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            cb(reader.result);
        };
        reader.onerror = (error) => {
            console.log("Error: ", error);
        };
    };

    fileSelectedHandler = event => {
        const file = event.target.files[0];
        if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(file.name)) {
            this.getBase64(file, result => {
                this.setState({
                    selectedImage: result,
                    imageError: false,
                    selectedFile: file
                });
            });
        } else {
            this.setState({
                imageError: true,
                imageErrorMessage: "File type is not image."
            });
        }
    };

    cancelImageHandler = () => {
        this.setState({
            selectedImage: null,
            selectedFile: null
        })
    }

    render() {
        let content = <Spinner />;
        if (!this.props.loading) {
            content = (
                <Aux>
                    <div className="Header">
                        <Avatar
                            size="44"
                            round={true}
                            src={this.props.userData.img}
                            name={this.props.userData.name + " " + this.props.userData.username}
                            border={50}
                        />
                        <div className="Header-item"><strong>{this.props.userData.name + " " + this.props.userData.username}</strong></div>
                        <div className="Header-item">{this.props.userData.email}</div>
                    </div>
                    <ChangePicture
                        userData={this.props.userData}
                        fileSelectedHandler={this.fileSelectedHandler}
                        selectedImage={this.state.selectedImage}
                        selectedFile={this.state.selectedFile}
                        cancelImageHandler={this.cancelImageHandler}
                        upload={this.upload}
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