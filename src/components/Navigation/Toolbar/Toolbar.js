import React from 'react';
import "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import { Link } from "react-router-dom";


const toolbar = (props) => (
    <header className="Toolbar">
        <div className="Logo">
            <Link to="/" alt="Home"><Logo /></Link>
        </div>
        <nav >
            {props.isAuth ?
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