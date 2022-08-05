import React from 'react'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import styles from './styles.module.scss'

function SortDropdown({ handleClick, sortMethods }) {
    const sortBy = useSelector(state => state.sort.sortBy)

    return (
        <motion.ul
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={styles.sort_options}>
            {sortMethods.map((method, index) =>
                <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    key={index}
                    onClick={() => handleClick(method)}
                    className={`${styles.sort_option} ${sortBy === method ? styles.active : ''}`}
                >
                    {method.replace(/_/g, ' ')}
                </motion.li>
            )}
        </motion.ul>
    )
}

export default React.memo(SortDropdown)