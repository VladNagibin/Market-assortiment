import React, {useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { useAuth } from '../hooks/auth.hook'
import { useNavigate } from "react-router-dom";
export default function Auth() {
    const {loading,request,error,CleanErrors}=useHttp()
    const {login,logout} = useAuth()
    const message = useMessage()
    const navigate = useNavigate()
    const [form,setForm] = useState({"email":"","password":"",'name':''})
    const changeForm = event=>{
        setForm({...form,[event.target.name]:event.target.value})
    }
    useEffect(()=>{
      //console.log(error)
      message(error)
      CleanErrors()
    },[error,CleanErrors])
    const registerHandler = async () =>{
      try{
        const data = await request('/api/registration',"POST",{...form})
        message(data.message)
      }catch(e){
        message(e.message)
      }
    }
    const logInHandler = async () =>{
      try{
        const data = await request('/api/logIn',"POST",{...form})
        message(data.message)
        if(data.token){
          login(data.token,data.id)
          navigate('/')
        }
      }catch(e){
        message(e.message)
      }
    }
    const logOutHandler = async () =>{
      logout()
    }
    return (
    <div>
      <label htmlFor='email'>Почта</label>
      <input type="text" name = "email" id = 'email' onChange={changeForm}></input>
      <label htmlFor='password'>Пароль</label>
      <input type="password" name = "password" id = 'password' onChange={changeForm}></input>
      <label htmlFor='name'>Имя</label>
      <input type="name" name = "name" id = 'name' onChange={changeForm}></input>
      <button type='submit' onClick={registerHandler} disabled={loading}>Регистрация</button>
      <button type='submit' onClick={logInHandler} disabled={loading}>Вход</button>
      <button type='submit' onClick={logOutHandler} disabled={loading}>Выход</button>
    </div>
  )
}
