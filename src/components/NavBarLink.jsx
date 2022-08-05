import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBarLink({ pageName, i }) {
    return (
        pageName === 'home' ? <NavLink to='/' className={({ isActive }) => (isActive) ? "active_page" : ""} key={i}>{pageName}</NavLink> :
            <NavLink to={`/${pageName}`} className={({ isActive }) => (isActive) ? "active_page" : ""}>{pageName.replace('_', ' ')}</NavLink>
    )
}

export default NavBarLink