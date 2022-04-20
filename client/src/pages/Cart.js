import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import ProductInCart from '../stuff/ProductInCart'
export default function Cart() {
    const auth = useContext(AuthContext)
    const [products, updateProducts] = useState([])
    useEffect(() => {
        updateProducts(auth.cart)
    }, [auth.cart])

    return (
        <div className='container cart-text-all'>
            <span className='cart-header'>В корзине {products.length} товаров</span>
            <div className='row'>

                {products.map(product => {
                    return <ProductInCart product={product} key={product._id} />
                })}

            </div>
            <button onClick={auth.deleteAll}>Очистить</button>
            <button>Заказать</button>

        </div>
    )
}
