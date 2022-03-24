import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import TreeOfCategories from './TreeOfCategories'
export default function Navbar() {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { request } = useHttp()
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        message("Выход выполнен")

    }
    function clickCatalog() {
        if (drawedCategories.length) {
            setDrawedCategories([])
        } else {
            setDrawedCategories(categories)
        }
    }
    async function getCategories(id) {
        var data = await request('/api/getCategory?id=' + id)
        setCategories(data.result)
    }
    const [categories, setCategories] = useState([])
    const [drawedCategories, setDrawedCategories] = useState([])
    useEffect(() => {
        getCategories(0)
    }, [])
    function checkAuth() {
        if (auth.isAutheficated) {
            return (
                <>
                    <li><NavLink to={'/auth'}>Профиль</NavLink></li>
                    <li><NavLink to={'/cart'}>Корзина<span className="badge">{(auth.cart != null) ? auth.cart.length : 0}</span></NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выход</a></li>
                </>
            )
        } else {
            return (
                <>
                    <li><NavLink to={'/auth'}>Войти</NavLink></li>
                    <li><NavLink to={'/auth'}>Зарегистрироваться</NavLink></li>
                </>
            )
        }
    }
    return (
        <>
            <div className='navbar-fixed'>
                <nav>
                    <div className="nav-wrapper">
                        <div className='container'>
                            <NavLink className="brand-logo" to={'/'}>Сосамба</NavLink>
                            <ul className="right hide-on-med-and-down">
                                <li><NavLink to={'/catalog/0'}>Каталог</NavLink></li>

                                {checkAuth()}

                            </ul>

                        </div>
                    </div>
                </nav>
            </div>
        </>
    )

}

