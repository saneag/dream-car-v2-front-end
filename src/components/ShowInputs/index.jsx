import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import styles from './styles.module.scss'

function ShowInputs({ value, states, options }) {
    return (
        <div key={value} className={styles.input_field}>
            <label>{value.replace(/_/, ' ')}</label>
            <input
                value={states}
                type={
                    value === 'year'
                        || value === 'engine_capacity'
                        || value === 'engine_power'
                        || value === 'price'
                        ? 'number' : 'text'
                }
                onChange={e => options(e.target.value)}
            />
            {states &&
                <FontAwesomeIcon
                    icon={faXmark}
                    className={styles.delete_icon}
                    onClick={() => options('')}
                />}
        </div>
    )
}

export default React.memo(ShowInputs)