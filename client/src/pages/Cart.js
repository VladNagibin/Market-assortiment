import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import Product from '../stuff/Product'
import ProductInCart from '../stuff/ProductInCart'
export default function Cart() {
    const auth = useContext(AuthContext)
    const { request } = useHttp()
    const [products, updateProducts] = useState([])
    useEffect(() => {
        updateProducts(auth.cart)
    }, [auth.cart])

    return (
        <>
            <h1>Корзина</h1>
            <div className='row'>
            <ul className="collection">
            {products.map(product => {
                return <ProductInCart product={product} key={product._id} />
            })}
            </ul>
            </div>
            <button onClick={auth.deleteAll}>Очистить</button>
            <button>Заказать</button>

        </>
    )
}
