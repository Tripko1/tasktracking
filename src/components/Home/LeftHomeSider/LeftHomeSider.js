import React from 'react';
import "./LeftHomeSider.css";
// import Button from "../../UI/Button/Button";

const leftHomeSider = (props) => {
    return (
        <div className="home-sticky-container">
            <nav className="home-left-sidebar-container">
                {/* <div home-left-sider-container-item1>
                    <ul>
                        <li><a href="#">Boards</a></li>
                        <li><a href="#">Template</a></li>
                        <li><a href="#">Home</a></li>
                    </ul>
                </div>
                <div className="home-left-sider-container-item1">
                    <div>
                        <ul style={{ marginBottom: "12px" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div className="home-left-sider-container-item2-teams">
                                    Teams
                                </div>
                            </div>
                            <li style={{ marginBottom: "4px" }}>
                                <Button btnType="Submit">
                                    Create a team
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div> */}
            </nav>
        </div>
    )
}

export default leftHomeSider;