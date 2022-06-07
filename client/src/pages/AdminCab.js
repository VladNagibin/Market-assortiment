import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import Orders from '../stuff/Orders'
import { useMessage } from '../hooks/message.hook'
export default function AdminCab() {
  const { request, loading } = useHttp()
  const [priceUpdate,setPriceUpdate] = useState(true)

  const message = useMessage()
  async function updatePrices() {
    var data = await request('/api/updatePrices', 'POST')
    message('Удалено:' + data.Deleted + 'Изменено цен:' + data.Changed)
  }
  async function checkPriceUpdate(){
    var data = await request('/api/howIsUpdating')
    setPriceUpdate(data.turnedOn)
  }
  useEffect(()=>{
    checkPriceUpdate()
  },[priceUpdate])
  async function changePriceUpdate(){
    if(!priceUpdate){
      var data = await request('/api/turnOnUpdating','POST') 
    }else{
      var data = await request('/api/turnOffUpdating','POST') 
    }
    message(data.message)
    checkPriceUpdate()
  }
  function loader() {
    if (loading) {
      return (
        <div className="progress blue lighten-2">
          <div className="indeterminate blue darken-4"></div>
        </div>)
    } else {
      return
    }
  }
  return (
    <div className='container'>
      <div className='row'>
        <h3>Панель управления</h3>
        <div className='col s12'>
          {
            loader()
          }
          <div className="switch" checked={priceUpdate} name='privateHouse' onChange={changePriceUpdate}>
          <a className="waves-effect waves-light btn-large indigo darken-3 adminCab-btn" onClick={updatePrices}>Обновить цены</a>
          <a className="waves-effect waves-light btn-large indigo darken-3 adminCab-btn">Обновить категории</a>
          <a className="waves-effect waves-light btn-large indigo darken-3 adminCab-btn">Добавить дочерние категории</a>
          
            <span className='AdminCabSpan'>Ежедневная выгрузка цен</span>
            <label>
              Выкл
              <input type="checkbox" />
              <span className="lever indigo darken-3"></span>
              Вкл
            </label>
          </div>
        </div>
      </div>
      <div>
        <Orders id='all' admin={true}/>
      </div>
    </div>
  )
}
