import React, { useCallback, useState } from 'react'
import "./Login.css"
import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import * as actions from "../../store/actions/index"
import Spinner from "../../components/UI/Spinner/Spinner"
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

const Login = props => {
    const [controls,setControls] = useState({
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
    });

    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);
    const success = useSelector(state => state.auth.success);

    const dispatch = useDispatch();
    const onAuth = useCallback((email, password) => dispatch(actions.auth(email, password)),[dispatch]);
    const onSetSuccess = useCallback(() => dispatch(actions.setSuccess()),[dispatch]);

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
        onAuth(
            controls.email.value,
            controls.password.value
        )
    };

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

    if (success) {
        onSetSuccess()
    }

    return (
        <div >

            <div className="Loginbox">
                <h1>LOG IN</h1>
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <p>
                    <Link to="/signup" className="switchLink">
                        SWITCH TO SIGN UP
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Login;