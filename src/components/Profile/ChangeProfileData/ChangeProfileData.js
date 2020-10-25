import React, { useState } from "react";
import "./ChangeProfileData.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../store/actions/index";

const ChangeProfileData = props => {
    const [controls,setControls] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Name",
            },
            value: props.userData.name !== null ? props.userData.name : "",
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
            value: props.userData.username !== null ? props.userData.username : "",
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
            value: props.userData.bio !== null ? props.userData.bio : "",
            validation: {},
            valid: false,
            touched: false,
        }
    });
    const [changePassword, setChangePassword] = useState({
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
    });
    const [btnPassword, setBtnPassword] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();
    const onGetEditProfile = (token, data) => dispatch(actions.getEditProfile(token, data));

    const checkValidity = (value, rules) => {
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
            isValid = value === changePassword.password.value && isValid;
        }

        return isValid;
    }

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    controls[controlName].validation
                ),
                touched: props.userData[controlName] !== null ?
                    props.userData[controlName] !== event.target.value :
                    "" !== event.target.value,
            },
        };
        setControls(updatedControls);
    };

    const inputPasswordHandler = (event, controlName) => {
        const updatedchangePassword = {
            ...changePassword,
            [controlName]: {
                ...changePassword[controlName],
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    changePassword[controlName].validation
                ),
                touched: true,
            },
        };
        setChangePassword(updatedchangePassword);
    };

    const openPassword = (event) => {
        event.preventDefault();
        setBtnPassword(!btnPassword);
    }

    const submitEditProfile = (event) => {
        event.preventDefault();
        const data = {
            name: controls["name"].value,
            username: controls["username"].value,
            bio: controls["bio"].value === "" ? null : controls["bio"].value
        }
        if (changePassword["password"].value !== "") {
            data.password = changePassword["password"].value
            data.password_confirmation = changePassword["password_confirmation"].value
        }
        onGetEditProfile(token, data);
        redirectToHome();
    }

    const redirectToHome = () => {
        setRedirect(true);
    }

    let red = null;
    if (redirect) {
        red = <Redirect to="/" />
    }

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key],
        });
    }

    const formPasswordArray = [];
    for (let key in changePassword) {
        formPasswordArray.push({
            id: key,
            config: changePassword[key],
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
                        changed={(event) => inputChangedHandler(event, formElement.id)}
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
    if (btnPassword) {
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
                            changed={(event) => inputPasswordHandler(event, formElement.id)}
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

    if (changePassword["password"].valid &&
        changePassword["password"].value === changePassword["password_confirmation"].value) {
        touchPassword = false;
    }
    const touchSomething = touchElements && touchPassword;

    return (
        <div className="ChangeProfileData">
            {red}
            <form onSubmit={submitEditProfile}>
                {form}
                <Button btnType="Submit" clicked={openPassword}>Change password</Button>
                {formPassword}
                <div className="centerButton">
                    <Button btnType="Success" disabled={touchSomething}>SUBMIT</Button>
                </div>
            </form>
        </div>
    )
}

export default ChangeProfileData;