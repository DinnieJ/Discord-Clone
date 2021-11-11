import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUserByToken, postLogin, postLogout } from '../repositories/AuthRepository'
import { getToken, removeToken, setToken } from '../utils/cookies'

const login = createAsyncThunk(
    'auth/login', 
    async (payload, thunkAPI) => {
        let res = null
        await postLogin(payload).then(response => {
            res = response.data
        }).catch(error => {
            throw new Error(error.response?.data.error_message ?? error )
        }) 

        return res
    }
)

const logout = createAsyncThunk(
    'auth/logout',
    async (payload, thunkAPI) => {
        let res = null
        await postLogout().then(response => {
            res = response.data
        }).catch(error => {
            throw new Error(error.response?.data.error_message ?? error)
        })

        return res
    }
)

const fetchUser = createAsyncThunk(
    'auth/user',
    async (payload, thunkAPI) => {
        console.log('run')
        let res = null
        await fetchUserByToken().then(response => {
            res = response.data
            console.log(res)
        }).catch(error => {
            throw new Error(error.response?.data.error_message ?? error)
        })

        return res
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        config: {},
        token: '',
        isLoggedIn: true
    },

    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload.data.data.user
            state.isLoggedIn = true
        }
    },
    extraReducers: builder => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            if(action.payload?.data) {
                state.user = action.payload.data.user
                state.token = action.payload.data.token
                state.isLoggedIn = true
                setToken(action.payload.data.token)
            } 
        }).addCase(logout.fulfilled, (state, action) => {
            state.user = null
            state.token = ''
            state.isLoggedIn = false
            removeToken()
        }).addCase(fetchUser.fulfilled, (state, action) => {
            console.log(action.payload)
            if(action.payload?.data) {
                state.user = action.payload.data.user
                state.token = getToken()
                state.isLoggedIn = true
            }
        }).addCase(fetchUser.rejected, (state, action) => {
            removeToken()
        })
    }
})

export { login, logout, fetchUser }
export const { setUserData } = authSlice.actions

export default authSlice.reducer