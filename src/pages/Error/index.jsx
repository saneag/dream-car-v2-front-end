import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

function Error() {
    return (
        <main className={styles.root}>
            <div>
                <p>404</p>
                <p>Page Not Found<br /><br />Go back to <Link to='/'>Home</Link></p>
            </div>
        </main>
    )
}

export default Error