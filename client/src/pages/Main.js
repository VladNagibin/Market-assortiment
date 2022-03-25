import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Main() {
  function mainBannerOnClick() {
    alert('Сосать будешь?')
  }
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
      <div className='row'>
        <h1>Товары по категориям</h1>
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

    </div>

  )
}
