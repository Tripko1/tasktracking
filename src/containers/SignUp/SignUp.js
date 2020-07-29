import React, { Component } from 'react';
import "./SignUp.css"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import * as actions from "../../store/actions/index"
import Spinner from "../../components/UI/Spinner/Spinner"
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

class SignUp extends Component {

    state = {
        controls: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 2
                },
                valid: false,
                touched: false,
            },
            username: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Username",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 2
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Mail Address",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
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

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onRegistration(
            this.state.controls.name.value,
            this.state.controls.username.value,
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.controls.password_confirmation.value
        )
    }



    render() {

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        let form = <Spinner />

        if (!this.props.loading) {
            form = formElementsArray.map((formElement) => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    invalid={!formElement.config.valid}
                />
            ))
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p style={{ color: 'red' }}><strong>{this.props.error}</strong></p>;
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }
        let redirect = null;
        if (this.props.success) {
            redirect = <Redirect to="/" />
        }
        return (
            <div >
                {authRedirect}
                {redirect}
                <div className="SignUpbox">
                    <h1>SIGN UP</h1>
                    {errorMessage}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="Success">SUBMIT</Button>
                    </form>
                    <p>
                        <Link to="/" className="switchLink">
                            SWITCH TO LOG IN
                        </Link>
                    </p>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        success: state.auth.success
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRegistration: (name, username, email, password, password_confirmation) =>
            dispatch(actions.registration(name, username, email, password, password_confirmation)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);