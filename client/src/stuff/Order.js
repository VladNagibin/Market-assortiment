import React from 'react'

export default function Order({ order,admin }) {
  var amount = 0
  function acceptButton(){
    if(admin){
      return <a className="waves-effect waves-light btn-small indigo darken-3 adminCab-btn">Подтвердить</a>

    }else{
      return
    }
  }
  return (
    <div className='row'>
      <div className='col l4 s12'>
        <div className="collection">
          <a href="#!" className="collection-item indigo lighten-5 black-text"><span className='badge black-text'>{order.user_data.fio}</span>Покупатель</a>
          <a href="#!" className="collection-item indigo lighten-5 black-text"><span className='badge black-text'>{order.order_date}</span>Дата заказа</a>
          <a href="#!" className="collection-item indigo lighten-5 black-text"><span className='badge black-text'>{order.status}</span>Статус</a>
        </div>
        
        <a className="waves-effect waves-light btn-small indigo darken-3 adminCab-btn">Открыть</a>
        {acceptButton()}
        
      </div>
      <div className='col l8 s12'>
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
