import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
export default function Product({ product, cart }) {
  const auth = useContext(AuthContext)
  function addToCart() {
    auth.addInCart(product._id)
  }
  function deleteFromCart() {
    auth.deleteFromCart(product._id)
  }
  function cartButton() {
    if (cart) {
      return <a className='waves-effect waves-light btn' onClick={deleteFromCart}>Удалить</a>

    } else {
      return <a className='waves-effect waves-light btn' onClick={addToCart}>В корзину</a>
    }
  }
  return (
    <div className='card hoverable' id={product._id}>
      <div className='card-image waves-effect waves-block waves-light'>
        <Link to={'/detail/' + product._id}><img src={product.image} className='activator responsive-img' alt='product' /></Link>
      </div>
      <div className="card-content card-name-height">
        <p className='barcode-text'>{product.barcode}</p>
        <p className='name-text'>{product.name}</p>
      </div>
      <div className="card-action flex-container">
        <div className='first center-align'>
          <p className='price-text'>{product.price + 'P'}</p>
          <p className='inBox-text'>{'(От ' + product.min_quantity + ' шт)'}</p>
        </div>
        <div className='second center-align'>
          <p>...</p>
        </div>
      </div>
      {/* <div className='card-content'>
        <span className='card-title activator grey-text text-darken-4'>{product.name}</span>
        <Link to={'/detail/' + product._id}><a className="waves-effect waves-light btn white-text">Open</a></Link>
        {cartButton()}
      </div>
      <div className='card-reveal'>
        <span className='card-title activator grey-text text-darken-4'>{product.name}</span>
        <p>Категория: {product.categoryId}</p>
        <br />
        <p>Цена: {product.price}</p>
      </div> */}
    </div>

  )
}
