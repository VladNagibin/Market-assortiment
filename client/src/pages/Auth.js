import React, {useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
export default function Auth() {
    const {loading,request,error,CleanErrors}=useHttp()
    
    const [form,setForm] = useState({"email":"","password":"",'name':''})
    const changeForm = event=>{
        setForm({...form,[event.target.name]:event.target.value})
    }
    useEffect(()=>{
      console.log(error)
      CleanErrors()
    },[error,CleanErrors])
    const registerHandler = async () =>{
      try{
        const data = await request('/api/registration',"POST",{...form})
        console.log(data)
      }catch(e){

      }
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
    </div>
  )
}
