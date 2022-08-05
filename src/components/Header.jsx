import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from '../redux/slices/changeThemeSlice'

import NavBarLink from './NavBarLink'

import themeIcon from '../assets/color_change.webp'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import BurgerMenu from '../components/BurgerMenu'

import { isAuthenticated, logout } from '../redux/slices/userAuthSlice'

function Header() {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.data)
    const theme = useSelector(state => state.changeTheme.theme)

    const toggleTheme = () => {
        dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))
    }

    const navLinks = React.useMemo(() => ['home', 'about', 'contact'], [])

    const [isVisible, setIsVisible] = React.useState(false)

    const isAuth = useSelector(isAuthenticated)

    const onClick = () => {
        if (isAuth && window.confirm('Are you sure you want to logout?')) {
            dispatch(logout())
            window.localStorage.removeItem('token')
            window.sessionStorage.removeItem('token')
        }
    }

    return (
        <header>
            <nav>
                <div id='theme-changer_btn'>
                    <button onClick={() => { toggleTheme() }}>
                        <img src={themeIcon} id='tc_img' alt='theme_changer' />
                    </button>
                </div>
                <ul>
                    {navLinks.map((linkName, index) => { return <li key={index}><NavBarLink pageName={linkName} /></li> })}
                    {isAuth ? <li><NavLink to='/add_car' className={({ isActive }) => (isActive) ? "active_page" : ""}>Add Car</NavLink></li> : null}
                </ul>
                <div className='auth_buttons'>
                    <Link to={!isAuth ? '/signin' : '/'}
                        element={!isAuth ? <SignIn /> : null}
                        className='sign_in auth_btn'>
                        {!isAuth ? 'Sign in' : userData.name}
                    </Link>
                    <Link to={!isAuth ? '/signup' : '/'}
                        element={!isAuth ? <SignUp /> : null}
                        className='sign_up auth_btn'
                        onClick={onClick}>
                        {!isAuth ? 'Sign up' : 'Logout'}
                    </Link>
                </div>
                <div id="menu_btn">
                    <div id="burger_menu_btn" onClick={() => setIsVisible(!isVisible)}>
                        <span className={`${isVisible ? 'change' : ''} bar top`}></span>
                        <span className={`${isVisible ? 'change' : ''} bar middle`}></span>
                        <span className={`${isVisible ? 'change' : ''} bar bottom`}></span>
                    </div>
                </div>
                {isVisible &&
                    <BurgerMenu
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                    />
                }
            </nav>
        </header>
    )
}

export default Header