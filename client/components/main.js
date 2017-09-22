import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from './navigation'
import Login from './login'
import Signup from './signup'
import Home from './home'
import Profile from './profile'
import Market from './market'

import store, { fetchItems } from '../store';

class Main extends Component {

    componentDidMount(){
        store.dispatch(fetchItems())
    }

    render() {
        return (
            <div>
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

const mapDispatch = null

export default Main