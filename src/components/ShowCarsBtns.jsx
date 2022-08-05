import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCarsLimit } from '../redux/slices/sortSlice'

function ShowCarsBtns() {
    const dispatch = useDispatch()
    const totalCars = useSelector(state => state.cars.totalCars)
    const { page, carsLimit } = useSelector(state => state.sort)

    const [showReadMore, setShowReadMore] = React.useState(false)
    const [showLess, setShowLess] = React.useState(false)

    React.useEffect(() => {
        setShowReadMore(carsLimit > totalCars ? false : true)
        setShowLess(carsLimit > 12 ? true : false)
    }, [carsLimit, totalCars])

    const showMoreCars = () => {
        if (carsLimit <= totalCars) {
            dispatch(setCarsLimit(carsLimit + 12))
        }
        console.log(carsLimit)
    }

    const showLessCars = () => {
        if (carsLimit > 12) {
            dispatch(setCarsLimit(carsLimit - 12))
        }
    }

    return (
        <div className='show_btns'>
            <div>
                {
                    showReadMore && page === 1 &&
                    <button className='showMoreBtn' onClick={showMoreCars}>Show more</button>
                }
            </div>
            <div>
                {
                    showLess && page === 1 &&
                    <button className='showLessBtn' onClick={showLessCars}>Show Less</button>
                }
            </div>
        </div>
    )
}

export default ShowCarsBtns