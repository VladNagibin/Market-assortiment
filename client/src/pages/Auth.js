import React, {useState } from 'react'
import { useHttp } from '../hooks/http.hook'
export default function Auth() {
    const {loading,request,error}=useHttp()
    
    const [form,setForm] = useState({"email":"","password":""})
    const changeForm = event=>{
        setForm({...form,[event.target.name]:event.target.value})
    }
    return (
    <div>
      <label for='email'></label>
      <input type="text" name = "email" id = 'email' onChange={changeForm}></input>
      
      <label for='password'></label>
      <input type="password" name = "password" id = 'password' onChange={changeForm}></input>
    </div>
  )
}
