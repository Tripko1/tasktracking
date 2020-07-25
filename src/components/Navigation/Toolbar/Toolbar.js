import React from 'react';
import "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems"


const toolbar = (props) => (
    <header className="Toolbar">
        <div className="Logo">
            <Logo />
        </div>
        <nav className="DesktopOnly">
            <NavigationItems isAuth={props.isAuth} />
        </nav>

    </header>
)

export default toolbar;