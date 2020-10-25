import React from 'react';
import DropdownItem from "./DropdownItem/DropdownItem";
import "./DropdownMenu.css";
import Avatar from "react-avatar";

import { useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom"
import { ReactComponent as Settings } from "../../../../assets/svg/settings-gears.svg";
import { ReactComponent as Logout } from "../../../../assets/svg/door-exit.svg";

const DropdownMenu = props => {
    const name = useSelector(state => state.userData.userData.name);
    const img = useSelector(state => state.userData.userData.img);
    const username = useSelector(state => state.userData.userData.username);
    
    return (
        <div className="dropdown">
            <DropdownItem
            >
                <Link to="/editProfile" className="dropdownLink">
                    <Avatar
                        size="50"
                        round={true}
                        src={img}
                        name={name + " " + username}
                        border={50}
                    />
                    <span style={{ marginLeft: "10px" }}><strong>My Profile</strong></span>
                </Link>
            </DropdownItem>
            <DropdownItem leftIcon={<Settings />}><strong>Settings</strong></DropdownItem>
            <DropdownItem leftIcon={<Logout />}><Link to="/logout" className="dropdownLink"><strong>Logout</strong></Link></DropdownItem>
        </div>
    )
}

export default withRouter(DropdownMenu);