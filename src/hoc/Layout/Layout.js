import React, { useState } from "react";
import Aux from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

import { useSelector } from 'react-redux';

const Layout = props => {
    const [open,setOpen] = useState(false);

    const isAuth = useSelector(state => state.auth.token !== null);
    const userData = useSelector(state => state.userData.userData);

    const setOpenState = () => {
        setOpen(!open);
    }

    return (
        <Aux>
            <div>
                <Toolbar
                    isAuth={isAuth}
                    userData={userData}
                    open={open}
                    setOpen={setOpenState}
                />
            </div>
            <main style={{ height: "100%" }}>{props.children}</main>
        </Aux>
    )
}

export default Layout;