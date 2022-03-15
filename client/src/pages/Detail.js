import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'

export default function Detail() {
  const { request } = useHttp()
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    barcode: '',
    min_quantity: 0,
    image: '',
    images: []
  })
  const productId = useParams().id
  async function getProduct() {
    const dataAll = await request('/api/product?id=' + productId)
    const data = dataAll.result
    setProduct({
      name: data.name,
      price: data.price,
      barcode: data.barcode,
      min_quantity: data.min_quantity,
      image: data.image,
      images: data.images
    })
  }
  useState(() => {
    getProduct()
  }, [])
  return (
    <div class="card large">
      <div class="card-image">
        <img src={product.image} />
        <span class="card-title">{product.name}</span>
      </div>
      <div class="card-content">
        <p>{product.price}</p>
      </div>
      <div class="card-action">
        <button class = 'waves-effect waves-light btn' href="#">Купить</button>
      </div>

    </div>
  )
}
