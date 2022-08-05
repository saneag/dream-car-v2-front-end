import { configureStore } from '@reduxjs/toolkit'
import cars from './slices/carsSlice'
import sort from './slices/sortSlice'
import changeTheme from './slices/changeThemeSlice'
import showModalCar from './slices/showModalCarSlice'

import { userReducer } from './slices/userAuthSlice'

export const store = configureStore({
    reducer: {
        cars,
        sort,
        changeTheme,
        showModalCar,
        auth: userReducer,
    },
})