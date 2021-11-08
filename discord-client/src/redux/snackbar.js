import { createSlice, createAction } from "@reduxjs/toolkit";

export const showSnackbar = createAction('ShowSnackbar')
export const hideSnackbar = createAction('HideSnackbar')


export default createSlice({
    name: 'snackbar',
    initialState: {
        message: '',
        show: false,
        type: ''
    },
    reducers: {
        
    },
    extraReducers: builder => {
        builder
        .addCase(showSnackbar, (state, action) => {
            state.message = action.payload.message
            state.show = true
            state.type = action.payload.type
        })
        .addCase(hideSnackbar, (state, action) => {
            state.message = ''
            state.show = false
        })
    }
}).reducer