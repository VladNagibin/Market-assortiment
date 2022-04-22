import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import ProductInCart from '../stuff/ProductInCart'
import Promocode from '../stuff/Promocode'
export default function Cart() {
    const auth = useContext(AuthContext)
    const [products, updateProducts] = useState([])
    useEffect(() => {
        updateProducts(auth.cart)
    }, [auth.cart])
    function finalprice() {
        var summ = 0
        products.forEach(element => {
            summ += element.price * element.quantity
        });
        return Math.round(summ * 100) / 100 + 'p'
    }
    function getPromocode(promocode) {
        alert(')))')
    }
    return (
        <div className='container cart-text-all'>
            <div className='cart-header'>
                <span >В корзине {products.length} товаров</span>
            </div>

            <div className='row'>

                {products.map(product => {
                    return <ProductInCart product={product} key={product._id} />
                })}

            </div>
            <div className='row'>
                <div className='col s6 cart-price'>
                    <div className='row cart-price-summ'>
                        <div className='col s4 cart-price-sp'>
                            <span>Итого:</span>
                        </div>
                        <div className='col s4 cart-price-num'>
                            <span>{finalprice()}</span>
                            <br />
                            <span className='cart-price-comm'>Цена без учета доставки</span>
                        </div>
                    </div>
                    <div className='row cart-discount'>
                        <div className='col s4 cart-price-sp'>
                            <span>Скидка:</span>
                        </div>
                        <div className='col s4 cart-price-num'>
                            <span>0р</span>
                        </div>
                    </div>
                    <div className='row'>
                        <span className='cart-price-info'>Способы и время доставки можно выбрать при оформлении заказа</span>
                    </div>
                </div>
                <div className='col s6'>
                    <div className='row'>
                        <div className='col s8 offset-s4'>
                            <div className='row'>
                                <Promocode getPromocode={getPromocode} />
                            </div>
                            <div className='row'>
                                <div className='cart-promocode-btn' onClick={auth.deleteAll}>
                                    <span className='center-align cart-clean-btn'>Очистить</span>
                                </div>
                                <div className='cart-promocode-btn'>
                                    <span className='cart-clean-btn'>Заказать</span>
                                </div>


                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
