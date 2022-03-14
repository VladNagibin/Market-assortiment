import React, { useContext, useEffect, useState } from 'react'
import { useMessage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
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
    request('/api/checkAuth?id='+auth.userId+'&token='+auth.token).then(data=>{
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
  },[])

  return (
    <div>
      <h1>Кабинет</h1>
      <label>{user.name}</label>
      <label>{user.mail}</label>

    </div>
  )
}
