import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setShowModal, setSelectedCar } from '../../redux/slices/showModalCarSlice'

import { motion } from 'framer-motion'

import convertPrice from '../../utils/convertPrice'

import styles from './styles.module.scss'

function Modal() {
    const dispatch = useDispatch()
    const selectedCar = useSelector(state => state.showModalCar.selectedCar)
    const showModal = useSelector(state => state.showModalCar.showModal)

    const handleClick = () => {
        dispatch(setShowModal(!showModal))
        dispatch(setSelectedCar(null))
    }

    const price = (value) => convertPrice(value)

    const [deviceType, setDeviceType] = React.useState("");

    React.useEffect(() => {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
                navigator.userAgent
            )
        ) {
            setDeviceType("Mobile");
        } else {
            setDeviceType("Desktop");
        }
    }, []);

    const closeModal = e => {
        if (deviceType !== 'Mobile') {
            e.stopPropagation()
        }
    }

    return (
        <motion.div className={styles.backdrop} onClick={handleClick}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1 }}>
            <motion.div className={styles.modal_content}
                onClick={closeModal}
            >
                <motion.img src={`http://localhost:5000/${selectedCar.imageUrl}`}
                    initial={{ y: '-100vh' }}
                    animate={{ y: '0px' }} />
                <motion.div className={styles.info}
                    initial={{ x: '100vw' }}
                    animate={{ x: '0px' }}>
                    <div>
                        {
                            Object.keys(selectedCar)
                                .filter(key => key !== 'imageUrl' && key !== '_id' && key !== '__v' && key !== 'added_by_id')
                                .map(key => {
                                    return <p key={key}><span>{key.replace(/_/, ' ')} :</span></p>
                                })
                        }
                    </div>
                    <div>
                        {
                            Object.keys(selectedCar)
                                .filter(key => key !== 'imageUrl' && key !== '_id' && key !== '__v' && key !== 'added_by_id')
                                .map(key => {
                                    return <p key={selectedCar[key]}>
                                        <span>
                                            {
                                                key === 'engine_capacity' ? `${selectedCar[key]} ml` :
                                                    key === 'engine_power' ? `${selectedCar[key]} hp` :
                                                        key === 'price' ? `$ ${price(selectedCar[key])}` :
                                                            selectedCar[key]
                                            }
                                        </span>
                                    </p>
                                })
                        }
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default React.memo(Modal)