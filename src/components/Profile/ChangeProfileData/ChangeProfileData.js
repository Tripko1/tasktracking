import React, { Component } from "react";
import "./ChangeProfileData.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

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
        changeSomething: false
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
            isValid = value === this.state.controls.password.value && isValid;
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
                touched: true,
            },
        };
        this.setState({ controls: updatedControls });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        let touchSomething = true;
        let form = (
            formElementsArray.map((formElement) => {

                if (touchSomething && formElement.config.touched && formElement.config.valid) {
                    touchSomething = false;
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

        return (
            <div className="ChangeProfileData">
                <form>
                    {form}
                    <div className="centerButton">
                        <Button btnType="Success" disabled={touchSomething}>SUBMIT</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ChangeProfileData;