import React from "react";
import "./Input.css";

const input = (props) => {
    let inputElement = null;
    let inputClasses = "InputElement ";
    let input = "Input"

    if (props.editInput) {
        input = props.editInput
    }

    if (props.editInputElement) {
        inputClasses = props.editInputElement
    }

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses = inputClasses + "Invalid ";
    }

    switch (props.elementType) {
        case "input":
            inputElement = (
                <input
                    className={inputClasses}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case "textarea":
            inputElement = (
                <textarea
                    className={inputClasses}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case "select":
            inputElement = (
                <select
                    className={inputClasses}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={inputClasses}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
    }

    return (
        <div className={input}>
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;