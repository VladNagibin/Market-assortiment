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
    images: [],
    parameters:[],
    description:''
  })
  const productId = useParams().id
  async function getProduct() {
    const dataAll = await request('/api/product?id=' + productId)
    const data = dataAll.result
    console.log(data.parameters.length)
    setProduct({
      name: data.name,
      price: data.price,
      barcode: data.barcode,
      min_quantity: data.min_quantity,
      image: data.image,
      images: [...data.images,data.image],
      parameters:data.parameters,
      description:data.description
    })
  }
  useState(() => {
    getProduct()
  }, [])
  return (
    <div className='container'>
      <div className='row'>
        <div className='barcode-detail valign-wrapper col s2'>
          <span className='barcode-detail-text'>{product.barcode}</span>
        </div>
        <div className='name-detail col s7' >
          <span>{product.name}</span>
        </div>
        {/* <div className="card large">
          <div className="card-image">
            <img src={product.image} alt='product' />
            <span className="card-title">{product.name}</span>
          </div>
          <div className="card-content">
            <p>{product.price}</p>
          </div>
          <div className="card-action">
            <button className='waves-effect waves-light btn' href="#">Купить</button>
          </div>

        </div> */}
      </div>
      <div className='row'>
        <div className='col s2'>
          {product.images.map(elem=>{
            return (<img key={elem} className='img-detail' src={elem}/>)
          })}
        </div>
        <div className='col s5'>
          <img src={product.image}/>
        </div>
        <div className='col s5 stats-detail'>
          <span>Технические характеристики</span>
          {product.parameters.map(elem=>{
            return(<div key={elem}><br/><span>{elem}</span></div>)
          })

          }
        </div>
      </div>
      <div className='row detail-desc'>
        <h5>Описание</h5>
        <div className='col s6'>
          <span>{product.description}</span>
        </div>
        <div className='col s6 detail-desc-info'>
          <span>Товары представлены в ассортименте, выбор цветов или моделей не предоставляется. На фотографиях могут быть представлены не все варианты.</span>
        </div>
      </div>
    </div>
  )
}
