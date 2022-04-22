import React, { useState } from 'react'

export default function Promocode({ getPromocode }) {
    const [promocode, setPromocode] = useState('')
    function sendPromocode() {
        getPromocode(promocode)
    }
    return (
        <form className=''>
            <div className='cart-promocode'>
                <input id="search" type="search" placeholder='   Введите промокод' onKeyDown={sendPromocode} onChange={(event) => {
                    setPromocode(event.target.value)
                }} value={promocode} />
            </div>
        </form>
    )
}
