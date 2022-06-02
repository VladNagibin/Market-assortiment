import React from 'react'

export default function Order({order}) {
  return (
    <div className='row'>
      <div className='col s4'>
        <span>Покупатель    : {order.user_data.fio}</span>
        <br/>
        <span>Дата заказа   : {order.order_date}</span>
        <br/>
        <span>Статус        : {order.status}</span>
      </div>
      <div className='col s8'>
          {
              order.products.map(product=>{
                  return <>
                    <span>{product.name} : {product.quantity}шт - {Math.round(product.quantity * product.price * 100) / 100 }p</span>
                    <br/>
                  </>
              })
          }

      </div>
    </div>
  )
}
