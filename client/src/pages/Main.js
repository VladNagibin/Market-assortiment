import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import ProductSlider from '../stuff/ProductSlider'
export default function Main() {
  const popularProductsId = ['629861d48879309757bffa28', '629861d48879309757bffa2b', '629861d48879309757bffa2c', '629861d48879309757bffa2d', '629861d48879309757bffa2e', '629861d48879309757bffa37']
  const { request } = useHttp()
  const [popularProducts, updatePopularProducts] = useState([])
  
  async function getPopular() {
    var data = await request('/api/Product', 'POST', {
      ids: popularProductsId
    })
    updatePopularProducts(data.result)
  }
  
  useEffect(() => {
    getPopular()
  }, [])
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
      <div className='banners'>
        <div className='banner'>
          <div className='card main-banners'>
            <div className='card-image main-banners hoverable '>
              <NavLink to='/catalog/21'><img src='Sad_i_dacha_category.png' alt='banner-sad'></img></NavLink>
            </div>

          </div>
        </div>
        <div className='banner'>
          <div className='card main-banners'>
            <div className='card-image main-banners hoverable '>
              <NavLink to='/catalog/141'><img src='kancelarya_category.png' alt='banner-kancelarya'></img></NavLink>
            </div>

          </div>
        </div>
        <div className='banner'>
          <div className='card main-banners'>
            <div className='card-image  main-banners hoverable'>
              <NavLink to='/catalog/114'><img src='himiya_category.png' alt='banner-himiya'></img></NavLink>
            </div>

          </div>
        </div>
      </div>
      <div className='banners'>
        <div className='banner'>
          <div className='card main-banners'>
            <div className='card-image main-banners hoverable'>
              <NavLink to='/catalog/22'><img src='dlya_detei_category.png' alt='banner-dlya_detei'></img></NavLink>
            </div>
          </div>
        </div>
        <div className='banner'>
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
        <ProductSlider products={popularProducts}/>
      </div>
      <div className='row'>
        <div className='col l8 offset-l2 s12 podpiska-rectangle'>
          <div className='podpiska-div'>
            <span className='white-text podpiska-text'>Будьте в курсе нашей актуальной информации!</span>
          </div>

          <div className="input-field col s12 xl8">
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
