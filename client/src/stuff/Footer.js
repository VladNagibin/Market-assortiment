import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Footer() {
    return (
        <footer className="page-footer white">
            <div className="container">
                <div className="row">
                    <div className='col s2'>
                    <img src='logo1.png'/>
                    </div>
                    <div className='col s2 offset-s2'>
                    <NavLink to='/'><span>Доставка и оплата</span></NavLink>
                    </div>
                    <div className='col s1'>
                    <NavLink to='/'><span>Контакты</span></NavLink>
                    </div>
                    <div className='col s2'>
                    <NavLink to='/'><span>О компании</span></NavLink>
                    </div>
                    
                </div>
            </div>
            <div className="footer-copyright blue darken-4">
                
                <div className="container">
                    © 2014 Copyright Text
                    <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
                </div>
            </div>
        </footer>
    )
}
