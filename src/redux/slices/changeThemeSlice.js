import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    theme: 'dark'
}

const changeThemeSlice = createSlice({
    name: 'changeTheme',
    initialState,
    reducers: {
        setTheme(state, action) {
            state.theme = action.payload
        }
    }
})

export const { setTheme } = changeThemeSlice.actions

export default changeThemeSlice.reducer