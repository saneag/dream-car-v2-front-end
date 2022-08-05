import React from 'react'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { Cars, Modal, Pagination, Search, Sort, Skeleton, ShowCarsBtns } from '../components/index.js'
import { fetchCars } from '../redux/slices/carsSlice'
import { setCarsLimit, setPage, setFilter } from '../redux/slices/sortSlice'

function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isMounted = React.useRef(false)
    const { cars, status } = useSelector(state => state.cars)
    const { sortBy, sortOrder, page, carsLimit, search } = useSelector(state => state.sort)
    const selectedCar = useSelector(state => state.showModalCar.selectedCar)

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            dispatch(setFilter({
                ...params,
                search: params.search || ''
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                page, carsLimit, sortBy, sortOrder, search
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, carsLimit, sortBy, sortOrder, search])

    React.useEffect(() => {
        dispatch(fetchCars({ page, carsLimit, sortBy, sortOrder, search }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, carsLimit, search, sortBy, sortOrder])

    React.useEffect(() => {
        dispatch(setPage(1))
        dispatch(setCarsLimit(12))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    return (
        <main>
            <div className='top_options'>
                <Search />
                <Sort />
            </div>
            <div className="cars_gallery">
                {
                    status === 'error' ? navigate('/error') :
                        status === 'loading' ? [...Array(carsLimit)].map((_, index) => <Skeleton key={index} />) :
                            cars.map(car => <Cars key={car.brand + car.model + car.price} {...car} />)
                }
            </div>
            {selectedCar && <Modal />}
            <Pagination />
            <ShowCarsBtns />
        </main>
    )
}

export default Home