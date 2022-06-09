import React, { useContext, useEffect, useState } from 'react'
import { useMessage } from '../hooks/message.hook'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import Orders from '../stuff/Orders'
export default function Cab() {
  const auth = useContext(AuthContext)
  const { request, error, CleanErrors } = useHttp()
  const message = useMessage()
  const [user, setUser] = useState({
    name: '',
    mail: '',
    orders: []
  })
  function checkToken() {
    request('/api/checkAuth', "POST", {
      id: auth.userId,
      token: auth.token
    }).then(data => {
      setUser({
        name: data.user.name,
        mail: data.user.mail,
        orders: data.user.orders
      })
      console.log(data.user.orders)
    })
  }
  useEffect(() => {
    message(error)
    CleanErrors()
  }, [error, CleanErrors, message])
  useEffect(() => {
    checkToken()
  }, [])

  return (
    <div>
      <h1>Кабинет</h1>
      <div className='row'>
        <div className='col s4'>
          <div className="collection">
            <a href="#!" className="collection-item indigo lighten-4 black-text"><span className='badge black-text'>{user.name}</span>Имя</a>
            <a href="#!" className="collection-item indigo lighten-4 black-text"><span className='badge black-text'>{user.mail}</span>E-mail</a>
          </div>
        </div>
      </div>



      <Orders id={auth.userId} admin={false} />
    </div>
  )
}
