import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import Slider from 'react-slick'
import ProductSlider from '../stuff/ProductSlider'
import { AuthContext } from '../context/AuthContext'
export default function Detail() {
  const { request } = useHttp()
  const [displayedPicture, setDisplayedPicture] = useState('')
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    barcode: '',
    min_quantity: 0,
    image: '',
    images: [],
    parameters: [],
    description: ''
  })
  const [similarProducts, setSimilarProducts] = useState([])
  const productId = useParams().id


  const auth = useContext(AuthContext)
  const [quantity, setQuantity] = useState(0)
  async function getQuantity() {
    if (auth.cart === null) {
      setQuantity(0)
      return
    }
    var cartProd = await auth.cart.find((el) => el._id === productId)
    // console.log(productId)
    if (cartProd == undefined) {
      setQuantity(0)
    } else {
      setQuantity(cartProd.quantity)
    }
  }
  function plusCart() {
    var changedQuantuty = quantity + 1
    if (changedQuantuty < product.min_quantity) {
      changedQuantuty = product.min_quantity
    }
    auth.addInCart(product, changedQuantuty)
    setQuantity(changedQuantuty)
  }
  function minusCart() {
    var changedQuantuty = quantity - 1
    if (changedQuantuty >= product.min_quantity) {
      auth.addInCart(product, changedQuantuty)
      setQuantity(changedQuantuty)

    } else {
      auth.deleteFromCart(product._id)
      setQuantity(0)
    }

  }

  async function getProduct() {
    const dataAll = await request('/api/product?id=' + productId)
    const data = dataAll.result
    //console.log(data.parameters.length)
    setProduct({
      name: data.name,
      price: data.price,
      articul:data.articul,
      barcode: data.barcode,
      min_quantity: data.min_quantity,
      image: data.image,
      images: [...data.images, data.image],
      parameters: [...data.props,...data.parameters],
      description: data.description
    })
    console.log([...data.props,data.parameters])
    setDisplayedPicture(data.image)
    getSimilar(data.name)
    getQuantity(data._id)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  function getSimilar(name) {
    var firstWord = name.slice(0, name.indexOf(' '))
    findSimiar(firstWord).then(result => {
      setSimilarProducts(result)
      // console.log(firstWord)
      // console.log(result.length)
    })
  }
  const pictOnClick = event => {
    setDisplayedPicture(event.target.currentSrc)
  }
  async function findSimiar(text) {
    var data = await request('/api/FinderTop10?text=' + text)
    return data.result
  }
  useEffect(() => {
    getProduct()
  }, [productId])

  return (
    <div className='container detail'>
      <div className='barcode-name'>
        <div className='barcode-detail center-align'>
          <div className='barcode-detail-text '>{product.articul}</div>
        </div>
        <div className='name-detail' >
          <span>{product.name}</span>
        </div>
      </div>
      <div className='row'>
        <div className='col s2'>
          {product.images.map(elem => {
            return (<img key={elem} className='img-detail' src={elem} onClick={pictOnClick} />)
          })}
        </div>
        <div className='col s5'>
          <img className='detail-main-pic' src={displayedPicture} />
        </div>
        <div className='col s5 stats-detail'>
          <div className='name-stat-detail'>
            <span >Технические характеристики</span>
          </div>

          {product.parameters.map(elem => {
            var statName = elem.slice(0, elem.indexOf('='))
            var statValue = elem.slice(elem.indexOf('=') + 1, elem.length)
            return (<div className='one-stat-detail row' key={elem}><div className='stat-name-detail col s6'>{statName}</div><div className='stat-value-detail col s6'>{statValue}</div></div>)
          })

          }
          <div className='detail-line'>
          </div>
          <div className="card-action flex-container">
            <div className='first center-align'>
              <p className='price-text'>{product.price + 'P'}</p>
              <p className='inBox-text'>{'(От ' + product.min_quantity + ' шт)'}</p>
            </div>
            <div className='space'></div>
            <div className='second center-align row'>
              <div className='cart-adding'>
                <i className="material-icons prefix waves-effect col s3 plus-minus" onClick={minusCart}>remove</i>
                <span className="plus-minus-text col s6 ">{quantity}</span>
                <i className="material-icons prefix waves-effect right col s3 plus-minus" onClick={plusCart}>add</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className='detail-opisanie'>Описание</span>
      <div className='row detail-desc'>

        <div className='col s5'>
          <span>{product.description}</span>
        </div>
        <div className='col s5 offset-s2 detail-desc-info'>
          <div className='desc-info'>Товары представлены в ассортименте, выбор цветов или моделей не предоставляется. На фотографиях могут быть представлены не все варианты.</div>
        </div>
      </div>
      <div className='right-align'>
        <span className='detail-opisanie '>Похожие товары</span>
      </div>

      <div className='row'>
        <ProductSlider products={similarProducts} />
      </div>
    </div>
  )
}
