import React from "react";
import "./NavigationItem.css";

const navigationItem = (props) => {

    return (
        <li className="NavigationItem">
            <div className="icon-button" onClick={() => props.setOpen()}>
                {props.icon}
                {props.open ? props.children : null}
            </div>
        </li>
    )
}

export default navigationItem;
