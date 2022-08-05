import React from 'react'
import ReactPagination from 'react-responsive-pagination'
import { useSelector, useDispatch } from 'react-redux'
import { setCarsLimit, setPage } from '../../redux/slices/sortSlice'

import styles from './styles.module.scss'

function Pagination() {
    const dispatch = useDispatch()
    const page = useSelector(state => state.sort.page)
    const totalCars = useSelector(state => state.cars.totalCars)
    const totalPages = Math.ceil(totalCars / 12)

    const handleChange = (currentPage) => {
        dispatch(setPage(currentPage))
        dispatch(setCarsLimit(12))
        window.scrollTo(0, 0)
    }
    return (
        <ReactPagination
            className={`${styles.root} pagination`}
            current={page}
            total={totalPages}
            onPageChange={(currentPage) => handleChange(currentPage)}
            previousLabel={'←'}
            nextLabel={'→'}
        />
    )
}

export default React.memo(Pagination)