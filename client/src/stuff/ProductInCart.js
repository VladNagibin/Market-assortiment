import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function ProductInCart({ product }) {
    const auth = useContext(AuthContext)
    const [quantity, setQuantity] = useState(product.quantity)
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
    function deleteFromCart() {
        auth.deleteFromCart(product._id)
    }
    return (
        <div className='row product-in-cart'>
            <div className='col l2 s4'>
                <div className='row'>
                    <div className='col s10'>
                        <Link to={'/detail/' + product._id}><img src={product.image} alt={product._id} className="cart-pic" /></Link>
                    </div>
                </div>
            </div>
            <div className='col l6 s8'>
                <div className='cart-text'>
                    <span className="cart-name">{product.name}</span>
                </div>
                <div className='cart-text'>
                    <span className="cart-sklad ">Наличие на складе</span>
                </div>
                <div className='cart-text'>
                    <span className="cart-sklad ">{product.articul}</span>
                </div>
            </div>
            <div className='col l4 s12'>
                <div className="card-action flex-container-cart">
                    <div className='price-cart center-align'>
                        <p className='price-text'>{product.price + 'P'}</p>
                        <p className='inBox-text'>{'(От ' + product.min_quantity + ' шт)'}</p>
                    </div>
                    <div className='plus-minus-cart center-align row'>
                        <div className='cart-adding row'>
                            <i className="material-icons prefix waves-effect col s3 plus-minus" onClick={minusCart}>remove</i>
                            <span className="plus-minus-text col s6 ">{quantity}</span>
                            <i className="material-icons prefix waves-effect right col s3 plus-minus" onClick={plusCart}>add</i>
                        </div>
                        <div className='row'>
                            <span className='summ-cart'>{'' + Math.round(quantity * product.price * 100) / 100 + 'p'}</span>
                        </div>
                    </div>
                    <div className='destroy-cart'>
                        <i className="material-icons clear-cart" onClick={deleteFromCart}>clear</i>
                    </div>
                </div>
            </div>
        </div>
        // <li className=" avatar">
        //     
        //         
        //         <p>{product.barcode} <br/>
        //             {product.price+'p'}
        //         </p>
        //         <span className="secondary-content">{product.quantity}</span>
        // </li>
    )
}

