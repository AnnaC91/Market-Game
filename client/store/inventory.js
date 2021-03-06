import axios from 'axios';
import socket from '../socket';
import { getItems } from './market'

//TYPES
const GET_INVENTORY = 'GET_INVENTORY'

//CREATORS
export function getInventory(items){
    return{
        type: GET_INVENTORY,
        items: items
    }
}

//THUNK
export function fetchInventory(id){
    return function thunk(dispatch){
        return axios.get(`/api/inventory/${id}`)
        .then(res=>res.data)
        .then(items => dispatch(getInventory(items)))
    }
}

export function sellItem(transactionObj){
    return function thunk(dispatch){
        return axios.put('/api/trade/sell', transactionObj)
        .then(res=>res.data)
        .then(items => {
            dispatch(getInventory(items))
        })
        .then(()=>{
            return axios.get('/api/market')
            .then(res=>res.data)
            .then(items=>{
                socket.emit('list-item', items)
            })
        })
    }
}

//REDUCER
export default function reducer(state=[], action){
    switch(action.type){
        case GET_INVENTORY:
            return action.items
        default:
            return state
    }
}