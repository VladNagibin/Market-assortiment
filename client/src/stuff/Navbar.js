import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook'
export default function Navbar() {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        message("Выход выполнен")

    }
    if (auth.isAutheficated) {
        return (
            <nav>
                <div className="nav-wrapper">
                    <NavLink className="brand-logo" to={'/'}>Сосамба</NavLink>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to={'/auth'}>Профиль</NavLink></li>
                        <li><NavLink to={'/Catalog'}>Каталог</NavLink></li>
                        <li><a href="/" onClick={logoutHandler}>Выход</a></li>
                    </ul>
                </div>
            </nav>
        )
    } else {
        return (
            <nav>
                <div className="nav-wrapper">
                    <NavLink className="brand-logo" to={'/'}>Сосамба</NavLink>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to={'/Catalog'}>Каталог</NavLink></li>
                        <li><NavLink to={'/auth'}>Войти</NavLink></li>
                        <li><NavLink to={'/auth'}>Зарегистрироваться</NavLink></li>
                    </ul>
                </div>
            </nav>
        )
    }

}
