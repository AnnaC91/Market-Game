import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchItems, fetchUser, buyItem, cancelListing} from '../store';

class Market extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buyer: this.props.currentUser
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        let price = e.target.price.value
        let remaining = this.props.currentUser.gold - price
        let transactionObj = {
            buyerId: this.props.currentUser.id,
            sellerId: e.target.sellerId.value ? e.target.sellerId.value : null,
            itemId: e.target.id.value,
            itemPrice: price,
            newInfo: {
                status: 'inventory',
                userId: this.props.currentUser.id,
                price: 0
            }
        }
        this.props.buy(transactionObj)
    }

    handleCancel(e){
        e.preventDefault()
        let transactionObj = {
            id: e.target.id.value,
            newInfo: { status: 'inventory', price: 0 },
        }
        this.props.cancelSale(transactionObj)
    }

    componentDidMount() {
        this.props.updateData()
    }

    render() {
        return (
            <div>
                <h1>Welcome to the marketboard! Feel free to browse.</h1>
                {this.props.marketplace.map(item => (
                    <div key={item.id}>
                        <h4>{item.item.name}</h4>
                        <p>{item.item.description}</p>
                        <p>Price: {item.price} gold</p>
                        <form onSubmit={this.handleSubmit}>
                            <input
                                name='sellerId'
                                type='number'
                                value={item.userId ? item.userId : undefined}
                                hidden
                                readOnly
                            />
                            <input
                                name='price'
                                type='number'
                                value={item.price}
                                hidden
                                readOnly
                            />
                            <input
                                name='id'
                                type='text'
                                value={item.id}
                                hidden
                                readOnly
                            />
                            {this.props.loggedIn ? (<button type='submit'>Buy</button>) : null}
                        </form>
                        <form onSubmit={this.handleCancel}>
                            <input
                                name='sellerId'
                                type='number'
                                value={item.userId ? item.userId : undefined}
                                hidden
                                readOnly
                            />
                            <input
                                name='price'
                                type='number'
                                value={item.price}
                                hidden
                                readOnly
                            />
                            <input
                                name='id'
                                type='text'
                                value={item.id}
                                hidden
                                readOnly
                            />
                            {(item.userId !== undefined && item.userId === this.props.currentUser.id) ? (<button type='submit'>Cancel</button>) : null}
                        </form>
                    </div>))}
            </div>
        )
    }
}

const mapState = function (state) {
    const logstatus = state.user.username ? true : false
    return {
        loggedIn: logstatus,
        currentUser: state.user,
        marketplace: state.market
    }
}

const mapDispatch = function (dispatch) {
    return {
        updateData() {
            dispatch(fetchItems())
            dispatch(fetchUser())
        },
        buy(transactionObj) {
            dispatch(buyItem(transactionObj))
        },
        cancelSale(transactionObj){
            dispatch(cancelListing(transactionObj))
        }
    }
}

export default connect(mapState, mapDispatch)(Market)