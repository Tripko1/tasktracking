import React from "react";
import "./NavigationItems.css"
import NavigationItem from "./NavigationItem/NavigationItem"

const navigationItems = (props) => {
    return (
        < ul className="NavigationItems" >
            {props.isAuth ? <NavigationItem link="/logout">Logout</NavigationItem> : null}
        </ul >
    )

}

export default navigationItems;