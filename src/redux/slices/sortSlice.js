import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sortBy: 'brand',
    sortOrder: 1,
    page: 1,
    carsLimit: 12,
    search: ''
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSortBy(state, action) {
            state.sortBy = action.payload
        },
        setSortOrder(state, action) {
            state.sortOrder = action.payload
        },
        setPage(state, action) {
            state.page = action.payload
        },
        setCarsLimit(state, action) {
            state.carsLimit = action.payload
        },
        setSearch(state, action) {
            state.search = action.payload
        },
        setFilter(state, action) {
            state.page = Number(action.payload.page)
            state.carsLimit = Number(action.payload.carsLimit)
            state.sortBy = action.payload.sortBy
            state.sortOrder = Number(action.payload.sortOrder)
            state.search = action.payload.search
        }
    }
})

export const { setSortBy, setSortOrder, setPage, setCarsLimit, setSearch, setFilter } = sortSlice.actions

export default sortSlice.reducer