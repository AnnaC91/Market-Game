import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../store/index';

function Navigation(props) {
    return (
        <div>
            <h1>Navigation</h1>
            <Link to={`/market`}><button>Market</button></Link>
            {props.loggedIn ? (<Link to={`/profile/${props.currentUser.id}`}><button>Profile</button></Link>) : null}
            {props.loggedIn ? (<Link to={`/`}><button onClick={props.logOutUser}>Log Out</button></Link>) : (<Link to={`/login`}><button>Log In</button></Link>)}
        </div>
    )
}

const mapState = function (state, ) {
    const logstatus = state.user.username ? true : false
    return {
        loggedIn: logstatus,
        currentUser: state.user
    }
}

const mapDispatch = function (dispatch) {
    return {
        logOutUser(e) {
            dispatch(logOut())
        }
    }
}

export default connect(mapState, mapDispatch)(Navigation)