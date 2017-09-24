import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export default function Home(){
    return(
        <div>
            <h1>Play the Market Game!</h1>
            <p>...Where you got fed up being an adventurer, realized it doesn't pay well for the danger you take on, and decided to become a merchant!</p>
        </div>
    )
}