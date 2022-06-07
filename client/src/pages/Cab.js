import React, { useContext, useEffect, useState } from 'react'
import { useMessage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import Orders from '../stuff/Orders'
export default function Cab() {
  const auth = useContext(AuthContext)
  const {request,error,CleanErrors}=useHttp()
  const message = useMessage()
  const [user,setUser] = useState({
    name:'',
    mail:'',
    orders:[]
})
  function checkToken(){
    request('/api/checkAuth',"POST",{
      id:auth.userId,
      token:auth.token
    }).then(data=>{
      setUser({
        name:data.user.name,
        mail:data.user.mail,
        orders:data.user.orders
      })
      console.log(data.user.orders)
    })
  }
  useEffect(()=>{
    message(error)
    CleanErrors()
  },[error,CleanErrors,message])
  useEffect(()=>{
      checkToken() 
  },[])

  return (
    <div>
      <h1>Кабинет</h1>
      <label>{user.name}</label>
      <label>{user.mail}</label>
      <Orders id={auth.userId} admin={false}/>
    </div>
  )
}
