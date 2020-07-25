import React, { Component } from 'react'
import "./Login.css"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import * as actions from "../../store/actions/index"
import Spinner from "../../components/UI/Spinner/Spinner"
import { Link, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'

class Login extends Component {
    state = {
        controls: {
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
            const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
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
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value
        )
    };

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

        if (this.props.success) {
            this.props.onSetSuccess()
        }

        return (
            <div >
                {authRedirect}
                <div className="Loginbox">
                    <h1>LOG IN</h1>
                    {errorMessage}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="Success">SUBMIT</Button>
                    </form>
                    {/* <Button clicked={this.switchAuthModeHandler} btnType="Danger">
                        SWITCH TO SIGN UP
                    </Button> */}
                    <p>
                        <Link to="/signup" className="link">
                            SWITCH TO SIGN UP
                        </Link>
                    </p>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId,
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token !== null,
        authRedirectPath: state.authRedirectPath,
        success: state.success
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onSetSuccess: () => dispatch(actions.setSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);