
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logIn } from '../store/index';

function Login(props) {
    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={props.logInUser}>
                <label>Email: </label>
                <input
                    name='email'
                    type='text'
                    required
                />
                <label>Password: </label>
                <input
                    name='password'
                    type='text'
                    required
                />
            <button type='submit'>Sign in</button>
            </form>
            <p>Don't have an account? Create one for free <Link to={`/signup`}>here</Link>!</p>
        </div>
    )

}

const mapState = null

const mapDispatch = function (dispatch, ownProps) {
    return {
        logInUser(e){
            e.preventDefault();
            dispatch(logIn({email:e.target.email.value,password:e.target.password.value},ownProps.history))
        }
    }
}

export default connect(mapState, mapDispatch)(Login)