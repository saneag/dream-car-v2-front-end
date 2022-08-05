import React from 'react'
import { motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import NavBarLink from '../NavBarLink'
import SignIn from '../../pages/SignIn'
import SignUp from '../../pages/SignUp'

import { isAuthenticated, logout } from '../../redux/slices/userAuthSlice'

import styles from './styles.module.scss'

function BurgerMenu({ isVisible, setIsVisible }) {
    const dispatch = useDispatch()
    const navLinks = ['home', 'about', 'contact']
    const isAuth = useSelector(isAuthenticated)

    const user = useSelector(state => state.auth.data)

    const onClick = () => {
        if (isAuth && window.confirm('Are you sure you want to logout?')) {
            dispatch(logout())
            window.localStorage.removeItem('token')
        }
    }

    return (
        <motion.div
            className={styles.root}
            initial={{ opacity: 0, y: '-100vh' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setIsVisible(!isVisible)}
        >
            <motion.ul>
                {navLinks.map((linkName, index) => { return <li key={index}><NavBarLink pageName={linkName} /></li> })}
                {isAuth ? <li><NavLink to='/add_car' className={({ isActive }) => (isActive) ? "active_page" : ""}>Add Car</NavLink></li> : null}
                <motion.div className={`${styles.auth_buttons} auth_buttons`}>
                    <motion.div className={`${styles.auth_buttons} auth_buttons`}>
                        <Link to={!isAuth ? '/signin' : '/'}
                            element={!isAuth ? <SignIn /> : null}
                            className={`${styles.auth_btn} sign_in auth_btn`}>
                            {!isAuth ? 'Sign in' : user.name}
                        </Link>
                        <Link to={!isAuth ? '/signup' : '/'}
                            element={!isAuth ? <SignUp /> : null}
                            className={`${styles.auth_btn} ${styles.sign_up} sign_up auth_btn`}
                            onClick={onClick}>
                            {!isAuth ? 'Sign up' : 'Logout'}
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.ul>
        </motion.div >
    )
}

export default React.memo(BurgerMenu)