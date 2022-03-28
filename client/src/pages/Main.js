import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import $ from 'jquery'
import { useHttp } from '../hooks/http.hook'
import Products from '../stuff/Products'
import Product from '../stuff/Product'
import Slider from 'react-slick'
export default function Main() {
  const popularProductsId = ['61f63f647efacc392a1ae510', '61f63f677efacc392a1ae514', '61f63f687efacc392a1ae516', '61f63f697efacc392a1ae524', '61f63f697efacc392a1ae528', '61f63f6a7efacc392a1ae52e']
  const { request } = useHttp()
  const [popularProducts, updatePopularProducts] = useState([])
  async function getPopular() {
    var data = await request('/api/Product', 'POST', {
      ids: popularProductsId
    })
    updatePopularProducts(data.result)
  }
  function mainBannerOnClick() {
    alert('Сосать будешь?')
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    // nextArrow:<a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>,

    // prevArrow:<a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>
  }

  useEffect(async () => {
    getPopular()
  }, [])
  return (
    <div className='container'>
      <div className='row'>
        <div className='col s12'>
          <div className='card'>
            <div className='card-image hoverable '>
              <img onClick={mainBannerOnClick} src='banner-first-main.png'></img>
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
              <NavLink to='/catalog/21'><img src='Sad_i_dacha_category.png'></img></NavLink>
            </div>

          </div>
        </div>
        <div className='col s5'>
          <div className='card main-banners'>
            <div className='card-image main-banners hoverable '>
              <NavLink to='/catalog/141'><img src='kancelarya_category.png'></img></NavLink>
            </div>

          </div>
        </div>
        <div className='col s4'>
          <div className='card main-banners'>
            <div className='card-image  main-banners hoverable'>
              <NavLink to='/catalog/114'><img src='himiya_category.png'></img></NavLink>
            </div>

          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col s4'>
          <div className='card main-banners'>
            <div className='card-image main-banners hoverable'>
              <NavLink to='/catalog/22'><img src='dlya_detei_category.png'></img></NavLink>
            </div>
          </div>
        </div>
        <div className='col s8'>
          <div className='card main-banners'>
            <div className='card-image main-banners hoverable'>
              <NavLink to='/catalog/130'><img src='tekstil_category.png'></img></NavLink>
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
                <div key={product._id}>
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
          
          <div className="input-field col s8">
            <input placeholder="moshnayaPochta@mail.ru" id="mail" type="text" className="validate  white"/>
          </div>
          <div className='col s4'>
            <a className='podpiska-button waves-effect waves-light btn'>Подписаться</a>
          </div>
        </div>

      </div>
    </div>

  )
}
