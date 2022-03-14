import React from 'react'
export default function Product({ product }) {
  function redirectToProduct() {
    alert('tut budet redirect')
  }
  return (
    <div className='card' id={product.id}>
      <div className='card-image waves-effect waves-block waves-light'>
        <img src={product.image} className='activator responsive-img' width="100" />
      </div>
      <div className='card-content'>
        <span className='card-title activator grey-text text-darken-4'>{product.name}</span>
        <p><button onClick={redirectToProduct}>Открыть</button></p>
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
