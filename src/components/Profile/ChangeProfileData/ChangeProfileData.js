import React, { Component } from "react";
import "./ChangeProfileData.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { Redirect } from "react-router-dom"
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

class ChangeProfileData extends Component {
    state = {
        controls: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Name",
                },
                value: this.props.userData.name !== null ? this.props.userData.name : "",
                validation: {
                    required: true,
                    minLength: 2,
                },
                valid: false,
                touched: false,
            },
            username: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Username",
                },
                value: this.props.userData.username !== null ? this.props.userData.username : "",
                validation: {
                    required: true,
                    minLength: 2,
                },
                valid: false,
                touched: false,
            },
            bio: {
                elementType: "textarea",
                elementConfig: {
                    type: "text",
                    placeholder: "Biography",
                },
                value: this.props.userData.bio !== null ? this.props.userData.bio : "",
                validation: {},
                valid: false,
                touched: false,
            },
        },
        changePassword: {
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
            password_confirmation: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Confirm Password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                    confirmPassword: true
                },
                valid: false,
                touched: false,
            },
        },
        changeSomething: false,
        btnPassword: false,
        redirect: false
    }

    checkValidity(value, rules) {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.confirmPassword) {
            isValid = value === this.state.changePassword.password.value && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: this.props.userData[controlName] !== null ?
                    this.props.userData[controlName] !== event.target.value :
                    "" !== event.target.value,
            },
        };
        this.setState({ controls: updatedControls });
    };

    inputPasswordHandler = (event, controlName) => {
        const updatedchangePassword = {
            ...this.state.changePassword,
            [controlName]: {
                ...this.state.changePassword[controlName],
                value: event.target.value,
                valid: this.checkValidity(
                    event.target.value,
                    this.state.changePassword[controlName].validation
                ),
                touched: true,
            },
        };
        this.setState({ changePassword: updatedchangePassword });
    };

    openPassword = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {
                btnPassword: !prevState.btnPassword
            }
        })
    }

    submitEditProfile = (event) => {
        event.preventDefault();
        const data = {
            name: this.state.controls["name"].value,
            username: this.state.controls["username"].value,
            bio: this.state.controls["bio"].value === "" ? null : this.state.controls["bio"].value
        }
        if (this.state.changePassword["password"].value !== "") {
            data.password = this.state.changePassword["password"].value
            data.password_confirmation = this.state.changePassword["password_confirmation"].value
        }
        this.props.onGetEditProfile(this.props.token, data);
        this.redirectToHome();
    }

    redirectToHome = () => {
        this.setState({
            redirect: true
        })
    }

    render() {
        let redirect = null;
        if (this.state.redirect) {
            redirect = <Redirect to="/" />
        }

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        const formPasswordArray = [];
        for (let key in this.state.changePassword) {
            formPasswordArray.push({
                id: key,
                config: this.state.changePassword[key],
            });
        }

        let touchElements = true;
        let formPassword = null;
        let form = (
            formElementsArray.map((formElement) => {
                if (touchElements && formElement.config.touched && formElement.config.valid) {
                    touchElements = false;
                }
                return (
                    <div key={formElement.id}>
                        <span className="LabelSpan"><strong>{formElement.config.elementConfig.placeholder}:</strong></span>
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            invalid={!formElement.config.valid}
                            editInput="InputEdit "
                            editInputElement="editInputElement "
                        />
                    </div>
                )
            }
            ))

        let touchPassword = true;
        if (this.state.btnPassword) {
            formPassword = (
                formPasswordArray.map((formElement) => {
                    return (
                        <div key={formElement.id}>
                            <span className="LabelSpan"><strong>{formElement.config.elementConfig.placeholder}:</strong></span>
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed={(event) => this.inputPasswordHandler(event, formElement.id)}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                invalid={!formElement.config.valid}
                                editInput="InputEdit "
                                editInputElement="editInputElement "
                            />
                        </div>
                    )
                }
                )
            )
        }

        if (this.state.changePassword["password"].valid &&
            this.state.changePassword["password"].value === this.state.changePassword["password_confirmation"].value) {
            touchPassword = false;
        }
        const touchSomething = touchElements && touchPassword;

        return (
            <div className="ChangeProfileData">
                {redirect}
                <form onSubmit={this.submitEditProfile}>
                    {form}
                    <Button btnType="Submit" clicked={this.openPassword}>Change password</Button>
                    {formPassword}
                    <div className="centerButton">
                        <Button btnType="Success" disabled={touchSomething}>SUBMIT</Button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetEditProfile: (token, data) => dispatch(actions.getEditProfile(token, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeProfileData);