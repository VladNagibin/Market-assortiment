import React from 'react'
import { Link, Navigate } from 'react-router-dom'
export default function Product({ product }) {
  function redirectToProduct() {
    Navigate('/detail/'+product._id)
  }
  return (
    <div className='card small' id={product._id}>
      <div className='card-image waves-effect waves-block waves-light'>
        <img src={product.image} className='activator responsive-img' width="100" />
      </div>
      <div className='card-content'>
        <span className='card-title activator grey-text text-darken-4'>{product.name}</span>
        <button><Link to={'detail/'+product._id}>Open</Link></button>
      </div>
      <div className='card-reveal'>
      <span className='card-title activator grey-text text-darken-4'>{product.name}</span>
        <p>Категория: {product.categoryId}</p>
        <br/>
        <p>Цена: {product.price}</p>
      </div>
    </div>

  )
}
