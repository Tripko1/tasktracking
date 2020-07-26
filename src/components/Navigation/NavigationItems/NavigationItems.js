import React from "react";
import "./NavigationItems.css"
import NavigationItem from "./NavigationItem/NavigationItem";

import DropdownMenu from "./DropdownMenu/DropdownMenu";

import { ReactComponent as Profile } from "../../../assets/svg/download.svg";

const navigationItems = (props) => {
    const style = {
        borderRadius: "100%",
        backgroundColor: "transparent",
        border: "none",
        margin: "auto",
        cursor: "pointer"
    }

    return (
        < ul className="NavigationItems" >
            {props.isAuth ?
                <NavigationItem
                    icon={<Profile />}
                    open={props.open}
                    setOpen={props.setOpen}
                >
                    <DropdownMenu />
                </NavigationItem>
                : null}
        </ul >
    )

}

export default navigationItems;