import React from "react";
import "./DropdownItem.css";

const dropdownItem = (props) => {
    return (
        <div className="dropdown-item">
            {props.leftIcon ? <span className="icon" style={{ marginRight: "10px" }}>{props.leftIcon}</span> : null}
            {props.children}
        </div>
    )
}

export default dropdownItem;