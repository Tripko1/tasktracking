import React from 'react';
import "./LeftHomeSider.css";
import { Link } from "react-router-dom";
import trelloLogo from "../../../assets/images/icon/trello-logo.png";
import template from "../../../assets/images/icon/apple-imac.png";
import home from "../../../assets/images/icon/home.png";
import plus from "../../../assets/images/icon/add-icon.png"

const leftHomeSider = (props) => {
    return (
        <div className="home-sticky-container">
            <nav className="home-left-sidebar-container">
                <div className="home-left-sider-container-item1">
                    <ul className="home-left-sider-container-item1-ul">
                        <li className="home-left-sider-container-item1-ul-li">
                            <Link to="#" className="home-left-sider-container-item1-ul-li-link">
                                <span className="home-left-sider-container-item1-ul-li-link-icon">
                                    <img src={trelloLogo} alt="" />
                                </span>
                                <span>Boards</span>
                            </Link>
                        </li>
                        <li className="home-left-sider-container-item1-ul-li">
                            <div className="home-left-sider-container-item1-ul-li-link">
                                <span className="home-left-sider-container-item1-ul-li-link-icon">
                                    <img src={template} alt="" />
                                </span>
                                <span>Template</span>
                            </div>
                        </li>
                        <li className="home-left-sider-container-item1-ul-li">
                            <div className="home-left-sider-container-item1-ul-li-link">
                                <span className="home-left-sider-container-item1-ul-li-link-icon">
                                    <img src={home} alt="" />
                                </span>
                                <span>Home</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="home-left-sider-container-item2">
                    <div>
                        <ul>
                            <div>
                                <div className="home-left-sider-container-item2-teams">
                                    <div className="home-left-sider-container-item2-teams-item">
                                        Teams
                                    </div>
                                </div>
                            </div>
                            <li className="home-left-sider-container-item1-ul-li">
                                <div className="home-left-sider-container-item1-ul-li-link">
                                    <span className="home-left-sider-container-item1-ul-li-link-icon">
                                        <img src={plus} alt="" />
                                    </span>
                                    <span>Create new team</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default leftHomeSider;