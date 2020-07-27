import React from "react";
import "./NavigationItems.css"
import NavigationItem from "./NavigationItem/NavigationItem";

import DropdownMenu from "./DropdownMenu/DropdownMenu";

import { ReactComponent as Profile } from "../../../assets/svg/download.svg";

const navigationItems = (props) => (
    < ul className="NavigationItems" >
        <NavigationItem
            icon={<Profile />}
            open={props.open}
            setOpen={props.setOpen}
        >
            <DropdownMenu />
        </NavigationItem>
    </ul >
)



export default navigationItems;