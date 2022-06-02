import React from 'react'
import { useHttp } from '../hooks/http.hook'
import Orders from '../stuff/Orders'
import {useMessage} from '../hooks/message.hook'
export default function AdminCab() {
  const {request, loading} = useHttp()
  const message = useMessage()
  async function updatePrices(){
    var data = await request('/api/updatePrices','POST')
    message('Удалено:' +data.Deleted+'Изменено цен:'+data.Changed)
  }
  function loader(){
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
        <a class="waves-effect waves-light btn-large indigo darken-3 adminCab-btn" onClick={updatePrices}>Обновление цен</a>
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
