import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import Product from '../stuff/Product'
import Slider from 'react-slick'
export default function Main() {
  const popularProductsId = ['61f63f647efacc392a1ae510', '61f63f677efacc392a1ae514', '61f63f687efacc392a1ae516', '61f63f697efacc392a1ae524', '61f63f697efacc392a1ae528', '61f63f6a7efacc392a1ae52e']
  const { request } = useHttp()
  const [popularProducts, updatePopularProducts] = useState([])
  const windowInnerWidth = window.innerWidth
  const slidesToShow = countSlides()
  function countSlides() {
    if (windowInnerWidth > 992) {
      return 3
    } else if (windowInnerWidth > 600) {
      return 2
    } else {
      return 1
    }
  }
  function PrevArrow(props) {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', color: 'blue' }}
        onClick={onClick}
      ><i className="material-icons">chevron_left</i></div>
    )
  }
  function NextArrow(props) {
    const { className, style, onClick } = props
    return (
      //
      <div
        className={className}
        style={{ ...style, display: 'block', color: 'blue' }}
        onClick={onClick}
      ><i className="material-icons">chevron_right</i></div>
    )

  }
  async function getPopular() {
    var data = await request('/api/Product', 'POST', {
      ids: popularProductsId
    })
    updatePopularProducts(data.result)
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    //autoplay: true,
    nextArrow: <NextArrow />,

    //,

    prevArrow: <PrevArrow />
  }
  useEffect(() => {
    getPopular()
  }, [getPopular])
  ///catalog/171
  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12'>
          <div className='card'>
            <div className='card-image hoverable'>
              <NavLink to='/catalog/171'><img src='banner-first-main.png' alt='banner-main'></img></NavLink>
            </div>

          </div>
        </div>
      </div>
      <div className='row '>
        <h1 className='headers-main'>Товары по категориям</h1>
      </div>
      <div className='row'>
        <div className='col s3'>
          <div className='card main-banners'>
            <div className='card-image main-banners hoverable '>
              <NavLink to='/catalog/21'><img src='Sad_i_dacha_category.png' alt='banner-sad'></img></NavLink>
            </div>

          </div>
        </div>
        <div className='col s5'>
          <div className='card main-banners'>
            <div className='card-image main-banners hoverable '>
              <NavLink to='/catalog/141'><img src='kancelarya_category.png' alt='banner-kancelarya'></img></NavLink>
            </div>

          </div>
        </div>
        <div className='col s4'>
          <div className='card main-banners'>
            <div className='card-image  main-banners hoverable'>
              <NavLink to='/catalog/114'><img src='himiya_category.png' alt='banner-himiya'></img></NavLink>
            </div>

          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col s4'>
          <div className='card main-banners'>
            <div className='card-image main-banners hoverable'>
              <NavLink to='/catalog/22'><img src='dlya_detei_category.png' alt='banner-dlya_detei'></img></NavLink>
            </div>
          </div>
        </div>
        <div className='col s8'>
          <div className='card main-banners'>
            <div className='card-image main-banners hoverable'>
              <NavLink to='/catalog/130'><img src='tekstil_category.png'  alt='banner-tekstil'></img></NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <h1 className='right-align headers-main'>Популярные товары</h1>
      </div>
      <div className='row'>
        <Slider {...settings}>
          {
            popularProducts.map(product => {
              return (
                <div key={product._id} className='carousel-card'>
                  <Product product={product} cart={false} />
                </div>
                //<a className="carousel-item" href={'#'+product._id} key={product._id}><img src={product.image}/></a>
              )
            })
          }
        </Slider>
      </div>
      <div className='row'>
        <div className='col s8 offset-s2 podpiska-rectangle'>
          <div className='podpiska-div'>
            <span className='white-text podpiska-text'>Будьте в курсе нашей актуальной информации!</span>
          </div>

          <div className="input-field col s12 l7 xl8">
            <input placeholder="moshnayaPochta@mail.ru" id="mail" type="text" className="validate  white" />
          </div>
          <div className='col s12 l5 xl4'>
            <a className='podpiska-button waves-effect waves-light btn indigo darken-3' href='/'>Подписаться</a>
          </div>
        </div>

      </div>
    </div>

  )
}
