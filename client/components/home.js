import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export default function Home(){
    return(
        <div>
            <h2>As a retired adventurer</h2>
            <p>...you got fed up for the low payments you receive for the dangers you face, and decided to become a merchant!</p>
        </div>
    )
}