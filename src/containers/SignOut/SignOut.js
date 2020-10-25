import React, { useCallback, useEffect } from 'react';
import * as actions from "../../store/actions/index";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

const SignOut = props => {
    const dispatch = useDispatch();
    const onLogout = useCallback(() => dispatch(actions.logout()),[dispatch]);

    useEffect(() => {
        onLogout();
    },[onLogout]);

    return <Redirect to="/" />
}

export default SignOut;