import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSortBy, setSortOrder } from '../../redux/slices/sortSlice'

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.scss'
import SortDropdown from '../SortDropdown';

function Sort_Cars() {
    const [showDropDown, setShowDropDown] = React.useState(false)
    const sortRef = React.useRef()

    const { sortBy, sortOrder } = useSelector(state => state.sort)
    const dispatch = useDispatch();

    const sortMethods = React.useMemo(() => ['brand', 'year', 'engine_power', 'price'], [])

    const handleClick = (method) => {
        setShowDropDown(!showDropDown)
        dispatch(setSortBy(method))
    }

    const handleChange = (e) => {
        e.stopPropagation()
        dispatch(setSortOrder(sortOrder === -1 ? 1 : -1))
    }

    React.useEffect(() => {
        const handleShowDropDown = (event) => {
            if (!event.path.includes(sortRef.current))
                setShowDropDown(false)
        }
        document.addEventListener('click', handleShowDropDown)
        return () => document.removeEventListener('click', handleShowDropDown)
    }, [])

    return (
        <div className={styles.sort_div}>
            <div>
                <motion.div
                    ref={sortRef}
                    className={`sort_title ${styles.sort_title}`}
                    onClick={() => setShowDropDown(!showDropDown)}>
                    Sort by: {sortBy.replace(/_/g, ' ')}
                    <FontAwesomeIcon icon={sortOrder === -1 ? faArrowDown : faArrowUp}
                        className={styles.sort_arrow}
                        onClick={e => handleChange(e)} />
                </motion.div>
                {showDropDown && <SortDropdown handleClick={handleClick} sortMethods={sortMethods} />}
            </div>
        </div>
    )
}

export default React.memo(Sort_Cars)