import React, { Component } from 'react';
import "./Home.css";
import * as actions from "../../store/actions/index";

import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from 'react-redux'
class Home extends Component {
    componentDidMount() {
        this.props.onGetUserData(this.props.token, this.props.userId);
    }
    render() {
        let Homecontent = <Spinner />;
        let error = null;

        if (!this.props.loading && this.props.error == null) {
            Homecontent = (
                <div>aaa</div>
            );
        }

        if (this.props.error) {
            error = <h1 style={{ textAlign: "center" }}><strong>{this.props.error}</strong></h1>;
        }

        return (
            <div className="Home">
                {error}
                {Homecontent}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        loading: state.userData.loading,
        error: state.userData.error,
        userData: state.userData.userData,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetUserData: (token, userId) => dispatch(actions.getUserData(token, userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);