import React from 'react'
import { io } from 'socket.io-client'
import { ERROR_SNACKBAR } from '../constants/snackbar'
import { store } from '../redux'
import { showSnackbar } from '../redux/snackbar'
import { setConnection, terminateConnection } from '../redux/socket'

const socket = io({
    autoConnect: false
})

socket.on('connect', () => {
    store.dispatch(setConnection({ id: socket.id }))
})

socket.on('connected-to-server', (args) => {
    console.log(args)
})

socket.on('disconnect', () => {
    store.dispatch(terminateConnection())
    store.dispatch(showSnackbar({ type: ERROR_SNACKBAR, message: 'Lost connect to server' }))
})


export { socket }
export const SocketContext = React.createContext()
export const SocketProvider = SocketContext.Provider