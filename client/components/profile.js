import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Profile (props){
    return(
        <div>
            <h1>{props.currentUser.username}'s Profile</h1>
            <p>gold: {props.currentUser.gold}</p>
        </div>
    )
}

const mapState = function(state){
    const logstatus = state.users.username ? true : false
    return {
        loggedIn: logstatus,
        currentUser: state.users
    }
}

export default connect(mapState)(Profile)