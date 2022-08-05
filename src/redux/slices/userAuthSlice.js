import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data
})

export const fetchAuthUser = createAsyncThunk('auth/fetchAuthUser', async (params) => {
    const { data } = await axios.get('/auth/me')
    return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params)
    return data
})

const initialState = {
    data: null,
    status: 'loading'
}

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuth.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null
        },
        [fetchAuthUser.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuthUser.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuthUser.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null
        },
        [fetchRegister.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchRegister.rejected]: (state, action) => {
            state.status = 'error'
            state.data = null
        }
    }
})

export const userReducer = userAuthSlice.reducer

export const isAuthenticated = state => Boolean(state.auth.data)

export const { logout } = userAuthSlice.actions