import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchInventory, sellItem } from '../store';

class Profile extends Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        let transactionObj = {
            id: e.target.id.value,
            status: {status: 'market'},
            userId: this.props.currentUser.id
        }
        this.props.sell(transactionObj)
    }

    componentDidMount() {
        this.props.getInventory(this.props.id)
    }

    render() {
        return (
            <div>
                <h1>{this.props.currentUser.username}'s Profile</h1>
                <p>Your total gold: {this.props.currentUser.gold}</p>
                {this.props.inventory.map(item => {
                    return (
                        <form key={item.id} onSubmit={this.handleSubmit}>
                            <h4>{item.item.name}</h4>
                            <p>{item.item.description}</p>
                            <p>Worth: {item.item.worth} gold</p>
                            <input
                                name='id'
                                type='text'
                                value={item.id}
                                hidden
                                readOnly
                            />
                            <button type='submit'>Sell</button>
                        </form>
                    )
                })}
            </div>
        )
    }
}

const mapState = function (state, ownProps) {
    const logstatus = state.user.username ? true : false
    const id = ownProps.match.params.id
    return {
        loggedIn: logstatus,
        currentUser: state.user,
        inventory: state.inventory ? state.inventory : [],
        id: id
    }
}

const mapDispatch = function (dispatch) {
    return {
        getInventory(id) {
            dispatch(fetchInventory(id))
        },
        sell(transactionObj) {
            dispatch(sellItem(transactionObj))
        }
    }
}

export default connect(mapState, mapDispatch)(Profile)