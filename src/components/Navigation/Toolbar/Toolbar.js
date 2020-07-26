import React from 'react';
import "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems"


const toolbar = (props) => (
    <header className="Toolbar">
        <div className="Logo">
            <Logo />
        </div>
        <nav >
            {props.userData.id !== null ?
                <NavigationItems
                    isAuth={props.isAuth}
                    userData={props.userData}
                    open={props.open}
                    setOpen={props.setOpen}
                /> : null}

        </nav>

    </header>
)

export default toolbar;