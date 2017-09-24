import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchItems } from '../store';

class Market extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buyer: this.props.currentUser,
            iteminstance: {}
        }
    }

    // handleSubmit(e) {
    //     e.preventDefault()
    //     let stateObject = {
    //         iteminstance: {
    //             id: event.target.id.value,
    //             status: 'inventory'
    //         },
    //         buyer: Object.assign({},this.state.buyer, {gold: this.state.buyer.price-})
    //     }
    //     this.setState()
    //     console.log(this.state)
    // }

    componentDidMount(){
        this.props.updateData()
    }

    render() {
        return (
            <div>
                <h1>Welcome to the marketboard! Feel free to browse.</h1>
                {this.props.marketplace.map(item => (<form key={item.id}>
                    <h4>{item.item.name}</h4>
                    <p>{item.item.description}</p>
                    <p>Price: {item.price} gold</p>
                    <input
                        name='id'
                        type='text'
                        value={item.id}
                        hidden
                        readOnly
                    />
                    {this.props.loggedIn ? (<button type='submit'>Buy</button>) : null}
                </form>))}
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
        updateData(){
            dispatch(fetchItems())
        }
    }
}

export default connect(mapState, mapDispatch)(Market)