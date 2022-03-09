import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/auth.hook'
import { useMessage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'
export default function Cab() {
  const {token,userId,ready} = useAuth()
  const {request,error,CleanErrors}=useHttp()
  const message = useMessage()
  const [user,setUser] = useState({
    name:'',
    mail:'',
    orders:[]
})
  function checkToken(){
    request('/api/checkAuth?id='+userId+'&token='+token).then(data=>{
      setUser({
        name:data.name,
        mail:data.mail,
        orders:data.orders
      })
    })
  }
  useEffect(()=>{
    message(error)
    CleanErrors()
  },[error])
  useEffect(()=>{
      checkToken()   
  },[ready])

  return (
    <div>
      <h1>Кабинет</h1>
      <label>{user.name}</label>
      <label>{user.mail}</label>

    </div>
  )
}
