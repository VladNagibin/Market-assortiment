import { useCallback, useState, useEffect } from "react"

export const useCart = ()=>{
    const [cart,updateCart] = useState([])
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cart'))
        if(data!=null){
            updateCart(data)
        }
        
    }, [])
    const addInCart = (product,quantity)=>{
        var foundedIndex = cart.findIndex((el)=>el._id===product._id)
        var cartRed
        if(foundedIndex === -1){
            cartRed = cart
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
            cartRed = cart
            cartRed[foundedIndex].quantity = quantity
            updateCart(cartRed)
        }
        localStorage.setItem('cart', JSON.stringify(cartRed))
    }
    const deleteFromCart = (id)=>{
        var foundedIndex = cart.findIndex((el)=>el._id===id)
        const newCart = [...cart.slice(0, foundedIndex), ...cart.slice(foundedIndex + 1)]
        //
        updateCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }
    const deleteAll=()=>{
        updateCart([])
        localStorage.removeItem('cart')
    }
    
    return {cart,addInCart,deleteFromCart,deleteAll }
}