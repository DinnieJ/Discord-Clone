import { createSlice } from "@reduxjs/toolkit";


const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        id: '',
        isConnected: false
    },
    reducers: {
        setConnection: (state, action) => {
            state.id = action.payload.id
            state.isConnected = true
        },

        terminateConnection: (state) => {
            state.id = ''
            state.isConnected = false
        }
    }
})
export const { setConnection, terminateConnection } = socketSlice.actions

export default socketSlice.reducer