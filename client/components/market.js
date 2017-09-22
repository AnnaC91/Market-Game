import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Market(props){
    return(
        <div>
            <h1>Welcome to the marketboard! Feel free to browse.</h1>
            {props.marketplace.map(item=>(<div key={item.id}>
                    <h4>{item.item.name}</h4>
                    <p>Price: {item.price} gold</p>
                </div>))}
        </div>
    )
}

const mapState = function(state){
    return{
        marketplace: state.market
    }
}

const mapDispatch = function(dispatch){
    return{

    }
}

export default connect(mapState, mapDispatch)(Market)