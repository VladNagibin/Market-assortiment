import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductInCart({product}) {
    return (
            <li className="collection-item avatar">
                <Link to={'/detail/'+product._id}><img src={product.image} alt={product._id} className="circle"/></Link>
                    <span className="title">{product.name}</span>
                    <p>{product.barcode} <br/>
                        {product.price+'p'}
                    </p>
                    <a className="secondary-content">{product.quantity}</a>
            </li>
    )
}
