import io from 'socket.io-client'
import store, { getItems } from './store';
const socket = io(window.location.origin)

socket.on('connect', function(){
    socket.on('buy-item', items=>{
        store.dispatch(getItems(items))
    })
    socket.on('cancel-listing', items=>{
        store.dispatch(getItems(items))
    })
    socket.on('list-item', items=>{
        store.dispatch(getItems(items))
    })
})

export default socket;