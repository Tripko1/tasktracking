import React, { useState } from "react";
import Aux from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

import { connect } from 'react-redux';

const Layout = props => {
    const [open,setOpen] = useState(false);

    const setOpenState = () => {
        setOpen(!open);
    }

    return (
        <Aux>
            <div>
                <Toolbar
                    isAuth={props.isAuth}
                    userData={props.userData}
                    open={open}
                    setOpen={setOpenState}
                />
            </div>
            <main style={{ height: "100%" }}>{props.children}</main>
        </Aux>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null,
        userData: state.userData.userData,
    }
}

export default connect(mapStateToProps)(Layout);