import React from 'react'
import { Link } from 'react-router-dom'
export default function Product({ product }) {

  return (
    <div className='card small' id={product._id}>
      <div className='card-image waves-effect waves-block waves-light'>
        <img src={product.image} className='activator responsive-img' width="100" alt='product'/>
      </div>
      <div className='card-content'>
        <span className='card-title activator grey-text text-darken-4'>{product.name}</span>
        <button><Link to={'/detail/'+product._id}>Open</Link></button>
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
