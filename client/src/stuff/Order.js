import React from 'react'

export default function Order({ order }) {
  var amount = 0
  return (
    <div className='row'>
      <div className='col s4'>
        <div className="collection">
          <a href="#!" className="collection-item indigo lighten-5 black-text"><span className='badge black-text'>{order.user_data.fio}</span>Покупатель</a>
          <a href="#!" className="collection-item indigo lighten-5 black-text"><span className='badge black-text'>{order.order_date}</span>Дата заказа</a>
          <a href="#!" className="collection-item indigo lighten-5 black-text"><span className='badge black-text'>{order.status}</span>Статус</a>
        </div>
        
        <a className="waves-effect waves-light btn-small indigo darken-3 adminCab-btn">Открыть</a>
        <a className="waves-effect waves-light btn-small indigo darken-3 adminCab-btn">Подтвердить</a>
      </div>
      <div className='col s8'>
        <div className="collection">
          {
            order.products.map(product => {
              amount += Math.round(product.quantity * product.price * 100) / 100
              return <a href="#!" key={product._id} className="collection-item indigo lighten-3 black-text"><span className='badge black-text'>{Math.round(product.quantity * product.price * 100) / 100}p</span>{product.name} : {product.quantity}шт </a>


            })
          }
          <a href="#!" className="collection-item indigo lighten-3 black-text"><span className='badge black-text'>{Math.round(amount * 100) / 100} p</span>Всего</a>
        </div>
      </div>
    </div>
  )
}
