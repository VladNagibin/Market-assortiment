import { useCallback, useState, useEffect } from "react"

export const useCart = ()=>{
    const [cart,updateCart] = useState([])
    const addInCart = useCallback((id,quantity)=>{
        var foundedIndex = cart.indexOf(el=>el.id==id)
        if(foundedIndex == -1){
            var cartRed = cart
            cartRed.push({
                id,
                quantity    
            })
            updateCart(cartRed)
            
        }else{   
            var cartRed = cart
            cartRed[foundedIndex].quantity = quantity
            updateCart(cartRed)
        }
        
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