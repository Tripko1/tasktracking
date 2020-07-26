import React from "react";
import "./DropdownItem.css";

const dropdownItem = (props) => {
    return (
        <div className="dropdown-item">
            <span className="icon" style={{ marginRight: "10px" }}>{props.leftIcon}</span>
            {props.children}
        </div>
    )
}

export default dropdownItem;