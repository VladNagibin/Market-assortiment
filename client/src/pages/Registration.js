import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
export default function Registration() {
    const { loading, request, error, CleanErrors } = useHttp()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const navigate = useNavigate()
    const [form, setForm] = useState({ "email": "", "password": "", 'name': '' })
    const changeForm = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    useEffect(() => {
        //console.log(error)
        message(error)
        CleanErrors()
    }, [error, CleanErrors, message])
    const registerHandler = async () => {
        try {
            await request('/api/registration', "POST", { ...form })
            message("Пользователь зарегистрирован")
            navigate('/auth')
        } catch (e) {
            message(e.message)
        }
    }
    return (
        <div className='container'>
            <div className='row'>
                <h1>Регистрация</h1>
                <div className='col s8 offset-s2 registation-form indigo lighten-5'>
                    <label htmlFor='email'>Почта</label>
                    <input type="text" name="email" id='email' onChange={changeForm}></input>
                    <label htmlFor='password'>Пароль</label>
                    <input type="password" name="password" id='password' onChange={changeForm}></input>
                    <label htmlFor='name'>Имя</label>
                    <input type="text" name="name" id='name' onChange={changeForm}></input>
                    
                    {/* <input type="name" name="name" id='name' onChange={changeForm}></input> */}
                    <button type='submit' className='btn waves-effect waves-light indigo darken-3' onClick={registerHandler} disabled={loading}>Регистрация</button>
                    {/* <button type='submit' className='btn waves-effect waves-light indigo darken-3' onClick={logInHandler} disabled={loading}>Вход</button> */}
                    {/* <button type='submit' onClick={logOutHandler} disabled={loading}>Выход</button> */}
                </div>
            </div>

        </div>
    )
}
