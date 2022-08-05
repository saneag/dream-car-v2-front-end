import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showModal: false,
    selectedCar: null,
}

const showModalCarSlice = createSlice({
    name: 'showModalCar',
    initialState,
    reducers: {
        setShowModal(state, action) {
            state.showModal = action.payload
        },
        setSelectedCar(state, action) {
            state.selectedCar = action.payload
        },
    }
})

export const { setShowModal, setSelectedCar } = showModalCarSlice.actions

export default showModalCarSlice.reducer