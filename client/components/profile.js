import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchInventory, fetchUser, sellItem } from '../store';

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            priceInput: [],
            inputId: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setPrice = this.setPrice.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        let transactionObj = {
            id: e.target.id.value,
            newInfo: { status: 'market', price: e.target.price.value },
            userId: this.props.currentUser.id
        }
        this.props.sell(transactionObj)
    }

    setPrice(e) {
        e.preventDefault()
        this.setState({ inputId: e.target.id.value, priceInput: this.state.priceInput.concat([<input key={this.state.priceInput.length} name='price' type='number' required />]) })
    }

    cancel() {
        this.setState({ priceInput: [] })
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
                        <div key={item.id}>
                            <h4 className='item-name'>{item.item.name}</h4>
                            <p className='item-desc'>{item.item.description}</p>
                            <p className='item-cost'>Worth: {item.item.worth} gold</p>
                            <form onSubmit={this.setPrice}>
                                <input
                                    name='id'
                                    type='text'
                                    value={item.id}
                                    hidden
                                    readOnly
                                />
                                <button type='submit'>Sell</button>
                            </form>
                            {this.state.priceInput.map(input => {
                                if (item.id==this.state.inputId){
                                    return (
                                    <form key={input} onSubmit={this.handleSubmit}>
                                        <label>Enter Price:</label>
                                        {input}
                                        <input
                                            name='id'
                                            type='text'
                                            value={item.id}
                                            hidden
                                            readOnly
                                        />
                                        <button type='submit'>Ok</button>
                                        <button onClick={this.cancel}>Cancel</button>
                                    </form>
                                )
                                }
                            })}
                        </div>
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
            dispatch(fetchUser())
        },
        sell(transactionObj) {
            dispatch(sellItem(transactionObj))
        }
    }
}

export default connect(mapState, mapDispatch)(Profile)