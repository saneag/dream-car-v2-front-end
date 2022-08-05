import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedCar } from '../../redux/slices/showModalCarSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPen } from '@fortawesome/free-solid-svg-icons'

import axios from '../../utils/axios'

import { motion } from 'framer-motion'

import convertPrice from '../../utils/convertPrice'

import styles from './styles.module.scss'

function Car(car) {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.data)
    const [showInfo, setShowInfo] = React.useState(false)
    const [showEdit, setShowEdit] = React.useState(false)
    const [showEditAdmin, setShowEditAdmin] = React.useState(false)

    const price = (value) => convertPrice(value)

    const handleOnHoverStart = () => {
        setShowInfo(true)
        if (userData && userData._id === car.added_by_id) {
            setShowEdit(true)
        }
        if (userData && userData.role === 'admin') {
            setShowEditAdmin(true)
        }
    }

    const handleOnHoverEnd = () => {
        setShowInfo(false)
        if (userData && userData._id === car.added_by_id) {
            setShowEdit(false)
        }
        if (userData && userData.role === 'admin') {
            setShowEditAdmin(false)
        }
    }

    return (
        <div className={styles.root}>
            <motion.div
                whileHover={{
                    scale: 1.1,
                }}
                onHoverStart={handleOnHoverStart}
                onHoverEnd={handleOnHoverEnd}
            >
                <motion.div key={car.imageUrl}
                    onClick={() => { dispatch(setSelectedCar(car)) }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}>
                    <div>
                        <motion.img
                            src={`${process.env.REACT_APP_API_URL}${car.imageUrl}`}
                            className={styles.image}
                            animate={{ opacity: 1 }}></motion.img>
                        {showEditAdmin && <ShowHelpBtns carID={car._id} />}
                        {showEdit && <ShowHelpBtns carID={car._id} />}
                        {showInfo &&
                            <div className={styles.info}>
                                <motion.div className={styles.info_text}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span>Anul: <span className={styles.year}>{car.year}</span></span>
                                    <span> Pretul: <span className={styles.cash}>$ {price(car.price)}</span></span>
                                </motion.div>
                            </div>
                        }
                    </div>
                    <p>{car.brand} <span className={styles.model}>{car.model}</span></p>
                </motion.div>
            </motion.div>
        </div>
    )
}

function ShowHelpBtns({ carID }) {
    const removeCar = async () => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            await axios.delete(`/cars/${carID}`)
            window.location.reload()
        }
    }
    return (
        <div
            className={styles.edit_btns}
            onClick={e => e.stopPropagation()}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
            >
                <FontAwesomeIcon
                    icon={faXmark}
                    className={styles.delete}
                    onClick={removeCar}
                />
                <Link to={`/cars/${carID}`}><FontAwesomeIcon icon={faPen} className={styles.edit} /></Link>
            </motion.div>
        </div>
    )
}

export default React.memo(Car)