import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Footer() {
    return (
        <footer className="page-footer white">

            <div className="row">
                <div className='col s2 offset-s1'>
                    <img src='logo1.png' />
                </div>
                <div className='col s5 offset-s1'>
                    <NavLink to='/' className='footer-text'><span>Доставка и оплата</span></NavLink>
                    <NavLink to='/' className='footer-text'><span>Контакты</span></NavLink>
                    <NavLink to='/' className='footer-text'><span>О компании</span></NavLink>
                </div>
                <div className='col s2 offset-s1'>
                    <span className='footer-text'>+7 905 921 68 08</span>
                    <br />
                    <span className='footer-text'>piskaZdorovaya@mail.ru</span>
                </div>

            </div>
            <div className='row'>
                <div className="footer-copyright ">

                        <NavLink to='/' className='footer-text-white'><span>Политика конфиденциальности</span></NavLink>
                        <NavLink to='/' className='footer-text-white'><span>Пользовательское соглашение</span></NavLink>
                        <NavLink to='/' className='footer-text-white'><span>Согласие на обработку персональных данных</span></NavLink>
                        <NavLink to='/' className='footer-text-white-copy'><span className='right-align'>© 2022 Маркет ассортимент<br/> Торговая платформа</span></NavLink>


                </div>

            </div>
        </footer>
    )
}
