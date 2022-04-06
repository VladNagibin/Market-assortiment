import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Footer() {
    return (
        <footer className="page-footer white">

            <div className="row">
                <div className='col l2 offset-xl1 m4 hide-on-small-only'>
                    <img src='logo1.png' />
                </div>
                <div className='col l6 offset-l1 m8 hide-on-small-only'>
                    <NavLink to='/' className='footer-text'><span>Доставка и оплата</span></NavLink>
                    <NavLink to='/' className='footer-text'><span>Контакты</span></NavLink>
                    <NavLink to='/' className='footer-text'><span>О компании</span></NavLink>
                </div>
                <div className='col l2 m8 offset-m4 hide-on-small-only'>
                    <span className='footer-text right-align'>+79059216808</span>
                    <br className='hide-on-med-and-down' />
                    <span className='footer-text right-align'>moshnayaPochta@mail.ru</span>
                </div>
                <div className='col s12 hide-on-med-and-up'>
                    <NavLink to='/' className='footer-text'><span>Доставка и оплата</span></NavLink>

                </div>
                <div className='col s12 hide-on-med-and-up'>
                    <NavLink to='/' className='footer-text'><span>Контакты</span></NavLink>

                </div>

                <div className='col s12 hide-on-med-and-up'>
                    <NavLink to='/' className='footer-text'><span>О компании</span></NavLink>

                </div>

                <div className='col s12 hide-on-med-and-up'>
                    <span className='footer-text right-align'>+79059216808</span>

                </div>

                <div className='col s12 hide-on-med-and-up'>
                    <span className='footer-text right-align'>moshnayaPochta@mail.ru</span>

                </div>


            </div>
            <div className='row footer-links'>
                    <div className='col s12 m6 l3 footer-low-panel'>
                        <NavLink to='/' className='footer-text-white '><span className='left-align'>Политика конфиденциальности</span></NavLink>

                    </div>
                    <div className='col s12 m6 l3 footer-low-panel'>
                        <NavLink to='/' className='footer-text-white'><span className='left-align'>Пользовательское соглашение</span></NavLink>

                    </div>
                    <div className='col s12 m6 l3 footer-low-panel'>
                        <NavLink to='/' className='footer-text-white'><span className='left-align'>Согласие на обработку персональных данных</span></NavLink>

                    </div>
                    <div className='col s12 m6 l3 footer-low-panel'>
                        <NavLink to='/' className='footer-text-white-copy'><span className='left-align'>© 2022 Маркет ассортимент<br /> Торговая платформа</span></NavLink>

                    </div>
                
            </div>
        </footer>
    )
}
