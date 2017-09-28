import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import Navigation from './navigation'
import Login from './login'
import Signup from './signup'
import Home from './home'
import Profile from './profile'
import Market from './market'

import store, { fetchItems, fetchUser } from '../store';

class Main extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchData()
        this.props.fetchCurrentUser()
    }

    render() {
        return (
            <div>
                <Link to={`/`}><h1>Market Game</h1></Link>
                <Navigation />
                <main>
                    <Switch>
                        <Route exact path='/signup' component={Signup}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/market' component={Market}/>
                        <Route exact path='/profile/:id' component={Profile}/>
                        <Route exact path='/' component={Home}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

const mapState = null

const mapDispatch = function(dispatch){
    return {
        fetchData(){
            dispatch(fetchItems())
        },
        fetchCurrentUser(){
            dispatch(fetchUser())
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Main))