import { useCallback, useState, useEffect } from "react"

export const useCart = ()=>{
    const [cart,updateCart] = useState([])
    const addInCart = useCallback((product,quantity)=>{
        var foundedIndex = cart.findIndex((el)=>el._id===product._id)
        if(foundedIndex == -1){
            var cartRed = cart
            cartRed.push({
                _id:product._id,
                barcode:product.barcode,
                image:product.image,
                name:product.name,
                min_quantity:product.min_quantity,
                price:product.price,
                quantity:quantity    
            })
            updateCart(cartRed)
            
        }else{   
            var cartRed = cart
            cartRed[foundedIndex].quantity = quantity
            updateCart(cartRed)
        }
        
    },[])
    const deleteFromCart = useCallback((id)=>{
        var foundedIndex = cart.findIndex((el)=>el._id===id)
        const newCart = [...cart.slice(0, foundedIndex), ...cart.slice(foundedIndex + 1)]
        //
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