import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
export default function Product({ product,cart }) {
  const auth = useContext(AuthContext)
  function addToCart(){
    auth.addInCart(product._id)
  }
  function deleteFromCart(){
    auth.deleteFromCart(product._id)
  }
  function cartButton(){
    if(cart){
      return <button onClick={deleteFromCart}>Удалить</button>
      
    }else{
      return <button onClick={addToCart}>В корзину</button>
    }
  }
  return (
    <div className='card small' id={product._id}>
      <div className='card-image waves-effect waves-block waves-light'>
        <img src={product.image} className='activator responsive-img' width="100" alt='product'/>
      </div>
      <div className='card-content'>
        <span className='card-title activator grey-text text-darken-4'>{product.name}</span>
        <button><Link to={'/detail/'+product._id}>Open</Link></button>
        {cartButton()}
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
