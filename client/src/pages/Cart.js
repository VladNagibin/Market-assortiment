import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import Product from '../stuff/Product'
export default function Cart() {
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [products, updateProducts] = useState([])
    useEffect(async ()=>{
        const dataAll = await request('/api/product','POST',{
            ids:auth.cart
        })
        updateProducts(dataAll.result)
    },(auth.cart))

    return (
        <>
            <h1>Корзина</h1>
            {products.map(product => {
                return <Product product={product} key = {product._id}cart={true}/>
            })}
            <button onClick={auth.deleteAll}>Очистить</button>
            <button>Заказать</button>

        </>
    )
}
