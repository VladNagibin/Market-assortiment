import { useCallback, useState, useEffect } from "react"

export const useCart = ()=>{
    const [cart,updateCart] = useState([])
    const addInCart = useCallback((id)=>{
        updateCart(Cart=>{
            return[...Cart,id]
        })
    },[])
    const deleteFromCart = useCallback((id)=>{
        const newCart = cart.filter(prod=>prod!==id)
        updateCart(newCart)
    },[])
    const deleteAll = useCallback(()=>{
        updateCart([])
        localStorage.removeItem('cart')
    })
    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cart'))
        updateCart(data)
    }, [])
    return {cart,addInCart,deleteFromCart,deleteAll }
}