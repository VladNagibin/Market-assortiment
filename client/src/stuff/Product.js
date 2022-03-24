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
      return <a className='waves-effect waves-light btn' onClick={deleteFromCart}>Удалить</a>
      
    }else{
      return <a className='waves-effect waves-light btn' onClick={addToCart}>В корзину</a>
    }
  }
  return (
    <div className='card large' id={product._id}>
      <div className='card-image waves-effect waves-block waves-light'>
        <img src={product.image} className='activator responsive-img'  alt='product'/>
      </div>
      <div className='card-content'>
        <span className='card-title activator grey-text text-darken-4'>{product.name}</span>
        <a className="waves-effect waves-light btn"><Link to={'/detail/'+product._id}>Open</Link></a>
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
