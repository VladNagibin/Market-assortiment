import React, { useContext, useEffect, useState } from 'react'
import {NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import TreeOfCategories from './TreeOfCategories'
export default function Navbar() {
    const auth = useContext(AuthContext)
    let navigate = useNavigate()
    const message = useMessage()
    const [categories, setCategories] = useState([])
    const [drawedCategories, setDrawedCategories] = useState([])
    const [finder, setFinder] = useState('')
    const { request } = useHttp()
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        message("Выход выполнен")

    }
    const findSmth = event => {
        if (event.keyCode === 13) {
            navigate('/finder/'+finder)
        }

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
        var elems = document.querySelectorAll('.sidenav');
        window.M.Sidenav.init(elems, {});
    },[])
    
    //<span className="badge nav-kek">{(auth.cart != null) ? auth.cart.length : 0}</span>
    function smallButtons() {
        if (auth.isAutheficated) {
            return (
                <ul className="sidenav" id="mobile-demo">
                    <li><NavLink className='btn white black-text catalog-button' to={'/auth'}>Профиль</NavLink></li>
                    <li><NavLink className='black-text btn white catalog-button' to={'/cart'}>Корзина<span className="badge badge-catalog">{auth.cart.length}</span></NavLink></li>
                    <li><a href="/" className='black-text btn white catalog-button' onClick={logoutHandler}>Выход</a></li>
                </ul>
            )
        } else {
            return (

                <ul className="sidenav" id="mobile-demo">
                    <li><NavLink className='black-text btn white catalog-button' to={'/auth'}>Войти</NavLink></li>
                    <li><NavLink className='black-text btn white catalog-button' to={'/auth'}>Зарегистрироваться</NavLink></li>
                </ul>

            )
        }
    }
    function checkAuth() {
        if (auth.isAutheficated) {
            return (
                <>
                    <div className='col l5 xl4 nav-buttons right'>
                        <NavLink className='btn white black-text catalog-button nav-butt' to={'/auth'}>Профиль</NavLink>
                        <NavLink className='black-text btn white catalog-button nav-butt' to={'/cart'}>Корзина<span className="badge badge-catalog">{auth.cart.length}</span></NavLink>
                        <a href="/" className='black-text btn white catalog-button nav-butt' onClick={logoutHandler}>Выход</a>

                    </div>
                    {/* <div className='col s2 l1 nav-buttons'>
                        <NavLink className='btn white black-text catalog-button' to={'/auth'}>Профиль</NavLink>
                    </div>
                    <div className='col s2 l1 nav-buttons'>
                        
                    </div>
                    <div className='col s2 l1 nav-buttons'>
                        
                    </div> */}
                </>
            )
        } else {
            return (
                <>
                    <div className='col s2 l1 nav-buttons'>
                        <NavLink className='black-text btn white catalog-button nav-butt' to={'/auth'}>Войти</NavLink>
                    </div>
                    <div className='col s4 l2 nav-buttons'>
                        <NavLink className='black-text btn white catalog-button' to={'/auth'}>Зарегистрироваться</NavLink>
                    </div>
                </>
            )
        }
    }
    return (
        <>

            <nav>
                <div className="nav-wrapper white">
                    <div className='row'>
                        <div className='col s6 m4 l3 xl2 offset-xl1'>
                            <NavLink className="brand-logo left"  to='/'><img className='logo' alt='logo' src='logo1.png'></img></NavLink>
                        </div>
                        <div className="col s3 m2 xl1">
                            <button className='btn waves-effect waves-light indigo darken-1 catalog-button' onClick={clickCatalog}>Каталог</button>
                        </div>
                        <a href="#" data-target="mobile-demo" className="sidenav-trigger hide-on-med-and-up"><i className="material-icons menu-icon">menu</i></a>
                        <div className='col l2 xl4 hide-on-med-and-down'>
                            <form className='grey lighten-3 nav-search'>
                                <div className="input-field">

                                    <input id="search" type="search" placeholder='Поиск епту' required onKeyDown={findSmth} onChange={(event) => {
                                        setFinder(event.target.value)
                                    }} value={finder}/>

                                </div>
                            </form>
                        </div>
                        {smallButtons()}
                        <div className='hide-on-small-only'>
                            {checkAuth()}
                        </div>


                    </div>
                </div>
            </nav>
            <div className='container'>
                <div className='row'>
                    <TreeOfCategories categories={drawedCategories} />
                </div>
            </div>
        </>
    )

}

