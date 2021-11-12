import { createSlice } from "@reduxjs/toolkit";
import { USER_STATUS } from "../constants/user";


const directMessageSlice = createSlice({
    name: 'direct-message',
    initialState: {
        current_user: { username: 'dork', status: USER_STATUS.ONLINE },
        messages: [
            {username: 'dork', content:'Hello There', created: new Date().toDateString()}
        ],
        typing: false,
    },
    reducers: {
        addMessage(state, action) {
            state.messages.push({
                username: action.payload.username,
                content: action.payload.content,
                created: new Date().toDateString()
            })
        }
    }
})

export const { addMessage } = directMessageSlice.actions

export default directMessageSlice.reducer