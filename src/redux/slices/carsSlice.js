import axios from '../../utils/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCars = createAsyncThunk('cars/fetchCars', async (params) => {
    const { page, carsLimit, sortBy, sortOrder, search } = params
    const { data } = await axios.get(`/cars?page=${page}&limit=${carsLimit}&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${search}`)
    return data
})

const initialState = {
    cars: [],
    totalCars: 0,
    status: 'loading'
}

const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        setCars: (state, action) => {
            state.cars = action.payload
        },
        setTotalCars: (state, action) => {
            state.totalCars = action.payload
        }
    },
    extraReducers: {
        [fetchCars.pending]: (state) => {
            state.status = 'loading'
            state.cars = []
            state.totalCars = 0
        },
        [fetchCars.fulfilled]: (state, action) => {
            state.cars = action.payload.cars
            state.totalCars = action.payload.totalItems
            state.status = 'success'
        },
        [fetchCars.rejected]: (state, action) => {
            state.status = 'error'
            state.cars = []
            state.totalCars = 0
        }
    }
})

export const { setCars } = carsSlice.actions

export default carsSlice.reducer