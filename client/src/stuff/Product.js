import React from 'react'

export default function Product({product}) {
  function redirectToProduct(){
    alert('tut budet redirect')
  }
  return (
    <li>
    <label>
    <a>{product.name}</a>
    <a>{product.available}</a>
    <a>{product.categoryId}</a>
    <a>{product.price}</a>
    <img src={product.image}/>
    
    <button onClick={redirectToProduct}>Открыть</button>  
    </label>
    </li>
  )
}
