import React from 'react'
import Product from './Product'
export default function Products({ products }) {
  return (
    products.map(product => {
      return (
        <>
          <div className="col s12 m6 l4" key={product._id}>
          <Product key={product._id} product={product} cart = {false}/>
          </div>
        </>
      )
    })
  )
}
