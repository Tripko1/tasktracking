import React, { Component } from 'react';
import DropdownItem from "./DropdownItem/DropdownItem";
import "./DropdownMenu.css";
import Avatar from "react-avatar";

import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom"
import { ReactComponent as Settings } from "../../../../assets/svg/settings-gears.svg";
import { ReactComponent as Logout } from "../../../../assets/svg/door-exit.svg";

class DropdownMenu extends Component {

    render() {
        return (
            <div className="dropdown">
                <DropdownItem
                >
                    <div>
                        <Avatar
                            size="50"
                            round={true}
                            src={this.props.img}
                            name={this.props.name + " " + this.props.username}
                            border={50}
                        />
                        <Link to="/editProfile" className="link" style={{ marginLeft: "10px" }}>
                            <strong>My Profile</strong>
                        </Link>
                    </div>
                </DropdownItem>
                <DropdownItem leftIcon={<Settings />}><div><strong>Settings</strong></div></DropdownItem>
                <DropdownItem leftIcon={<Logout />}><Link to="/logout" className="link"><strong>Logout</strong></Link></DropdownItem>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.userData.userData.name,
        img: state.userData.userData.img,
        username: state.userData.userData.username
    }
}

export default withRouter(connect(mapStateToProps)(DropdownMenu));