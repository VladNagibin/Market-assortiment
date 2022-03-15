import React from 'react'
import Product from './Product'
export default function Products({ products }) {
  return (
    products.map(product => {
      return (
         <Product key={product._id} product={product} />)
    })
  )
}
