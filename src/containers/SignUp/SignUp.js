import React, { useCallback, useState } from 'react';
import "./SignUp.css"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import * as actions from "../../store/actions/index"
import Spinner from "../../components/UI/Spinner/Spinner"
import { Link, Redirect } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

const SignUp = props => {
    const [controls,setControls] = useState({
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
    });
    const loading = useSelector(state =>  state.auth.loading);
    const error = useSelector(state =>  state.auth.error);
    const isAuthenticated = useSelector(state =>  state.auth.token !== null);
    const authRedirectPath = useSelector(state =>  state.auth.authRedirectPath);
    const success = useSelector(state =>  state.auth.success);

    const dispatch = useDispatch();
    const onRegistration = useCallback((name, username, email, password, password_confirmation) =>
            dispatch(actions.registration(name, username, email, password, password_confirmation)),[dispatch]);

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
            isValid = value === controls.password.value && isValid;
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
                touched: true,
            },
        };
        setControls(updatedControls);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        onRegistration(
            controls.name.value,
            controls.username.value,
            controls.email.value,
            controls.password.value,
            controls.password_confirmation.value
        )
    }

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key],
        });
    }

    let form = <Spinner />

    if (!loading) {
        form = formElementsArray.map((formElement) => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => inputChangedHandler(event, formElement.id)}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                invalid={!formElement.config.valid}
            />
        ))
    }
    let errorMessage = null;
    if (error) {
        errorMessage = <p style={{ color: 'red' }}><strong>{error}</strong></p>;
    }

    let authRedirect = null;
    if (isAuthenticated) {
        authRedirect = <Redirect to={authRedirectPath} />;
    }
    let redirect = null;
    if (success) {
        redirect = <Redirect to="/" />
    }
    return (
        <div >
            {authRedirect}
            {redirect}
            <div className="SignUpbox">
                <h1>SIGN UP</h1>
                {errorMessage}
                <form onSubmit={submitHandler}>
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

export default SignUp;