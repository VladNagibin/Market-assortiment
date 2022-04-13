import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
export default function Product({ product }) {
  const auth = useContext(AuthContext)
  const [quantity, setQuantity] = useState(0)
  async function getQuantity() {
    if(auth.cart===null){
      setQuantity(0)
      return
    }
    var cartProd = await auth.cart.find((el) => el._id === product._id)
    if (cartProd == undefined) {
      setQuantity(0)
    } else {
      setQuantity(cartProd.quantity)
    }
  }
  function plusCart() {
    var changedQuantuty = quantity + 1
    if (changedQuantuty < product.min_quantity) {
      changedQuantuty = product.min_quantity
    }
    auth.addInCart(product, changedQuantuty)
    setQuantity(changedQuantuty)
  }
  function minusCart() {
    var changedQuantuty = quantity - 1
    if (changedQuantuty >= product.min_quantity) {
      auth.addInCart(product, changedQuantuty)
      setQuantity(changedQuantuty)

    } else {
      auth.deleteFromCart(product._id)
      setQuantity(0)
    }

  }
  useEffect(() => {
    getQuantity()
  }, [getQuantity])
  return (
    <div className='card hoverable product' id={product._id}>
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
        <div className='space'></div>
        <div className='second center-align row'>
          <div className='cart-adding'>
            <i className="material-icons prefix waves-effect col s3 plus-minus" onClick={minusCart}>remove</i>
            <span className="plus-minus-text col s6 ">{quantity}</span>
            <i className="material-icons prefix waves-effect right col s3 plus-minus" onClick={plusCart}>add</i>
          </div>
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
