import React, { Component } from "react";
import Aux from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

import { connect } from 'react-redux';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <div>
                    <Toolbar isAuth={this.props.isAuth} />
                </div>
                <main>{this.props.children}</main>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);