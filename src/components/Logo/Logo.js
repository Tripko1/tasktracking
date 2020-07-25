import React from "react";
import trelloLogo from "../../assets/images/t.png";
import "./Logo.css";

const logo = (props) => (
    <div className="Logo">
        <img src={trelloLogo} alt="Trello" />
    </div>
);

export default logo;
