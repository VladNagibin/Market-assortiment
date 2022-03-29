import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import TreeOfCategories from './TreeOfCategories'
export default function Navbar() {
    const auth = useContext(AuthContext)
    const message = useMessage()

    const [categories, setCategories] = useState([])
    const [drawedCategories, setDrawedCategories] = useState([])
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
   
    useEffect(() => {
        getCategories(0)
    }, [])
    //<span className="badge nav-kek">{(auth.cart != null) ? auth.cart.length : 0}</span>
    function checkAuth() {
        if (auth.isAutheficated) {
            return (
                <>
                    <div className='col s1  nav-buttons'>
                        <NavLink className='btn white black-text catalog-button' to={'/auth'}>Профиль</NavLink>
                    </div>
                    <div className='col s1  nav-buttons'>
                        <NavLink className='black-text btn white catalog-button' to={'/cart'}>Корзина</NavLink>
                    </div>
                    <div className='col s1 nav-buttons'>
                        <a href="/" className='black-text btn white catalog-button' onClick={logoutHandler}>Выход</a>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className='col s1 nav-buttons'>
                        <NavLink className='black-text btn white catalog-button' to={'/auth'}>Войти</NavLink>
                    </div>
                    <div className='col s2 nav-buttons'>
                        <NavLink className='black-text btn white catalog-button' to={'/auth'}>Зарегистрироваться</NavLink>
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <div className='navbar-fixed'>
                <nav>
                    <div className="nav-wrapper white">
                        <div className='row'>
                            <div className='col s2 offset-m1'>
                                <NavLink className="brand-logo left" to='/'><img className='logo' src='logo1.png'></img></NavLink>
                            </div>
                            <div className="col s1">
                                <a className='btn waves-effect waves-light indigo darken-1 catalog-button' onClick={clickCatalog}>Каталог</a>
                            </div>
                            <div className='col s5 hide-on-med-and-down'>
                                <form className='grey lighten-3 nav-search'>
                                    <div className="input-field">

                                        <input id="search" type="search" placeholder='Поиск епту' required />

                                    </div>
                                </form>
                            </div>
                            {checkAuth()}


                        </div>
                    </div>
                </nav>
            </div>
            <div className='container'>
                <div className='row'>
                    <TreeOfCategories categories={drawedCategories} />
                </div>
            </div>

        </>
    )

}

