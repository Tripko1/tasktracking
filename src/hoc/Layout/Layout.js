import React, { Component } from "react";
import Aux from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        open: false
    }

    setOpen = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                open: !prevState.open
            }
        })
    }

    render() {
        return (
            <Aux>
                <div>
                    <Toolbar
                        isAuth={this.props.isAuth}
                        userData={this.props.userData}
                        open={this.state.open}
                        setOpen={this.setOpen}
                    />
                </div>
                <main>{this.props.children}</main>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null,
        userData: state.userData.userData,
    }
}

export default connect(mapStateToProps)(Layout);