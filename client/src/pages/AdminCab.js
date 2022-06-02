import React from 'react'
import Orders from '../stuff/Orders'

export default function AdminCab() {
  
  return (
    <div className='container'>
      <div className='row'>
        <h3>Панель управления</h3>
        <div className='col s12'>
        <a class="waves-effect waves-light btn-large indigo darken-3 adminCab-btn">Обновление товаров</a>
        <a class="waves-effect waves-light btn-large indigo darken-3 adminCab-btn">Обновление категорий</a>
        <a class="waves-effect waves-light btn-large indigo darken-3 adminCab-btn">Добавление дочерних категорий</a>
        </div>
      </div>
      <div>
        <Orders id='all'/>
      </div>
    </div>
  )
}
