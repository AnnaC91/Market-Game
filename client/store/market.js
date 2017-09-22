import axios from 'axios';

//TYPES
const GET_ITEMS = 'GET_ITEMS'

//CREATORS
export function getItems(items){
    return{
        type: GET_ITEMS,
        items: items
    }
}

//THUNK
export function fetchItems(){
    return function thunk(dispatch){
        return axios.get('/api/market')
        .then(res=>res.data)
        .then(items => dispatch(getItems(items)))
    }
}

//REDUCER
export default function reducer(state=[], action){
    switch(action.type){
        case GET_ITEMS:
            return action.items
        default:
            return state
    }
}