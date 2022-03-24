import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import TreeOfCategories from '../stuff/TreeOfCategories'
import Products from '../stuff/Products'
import { Link } from 'react-router-dom'

export default function Main() {
  const { request, error, CleanErrors } = useHttp()
  const message = useMessage()
  const [categories, setCategories] = useState([])
  async function getCategories(id) {
    var data = await request('/api/getCategory?id=' + id)
    setCategories(data.result)
  }
  useEffect(() => {
    getCategories(0)
  }, [])
  //width="500" heigth='500'
  return (
    <>
      <div className='container'>
        <div className='row'>
          <TreeOfCategories categories={categories} />
          <div className='col s6 '>
            <div className='card'>
              <div className='card-image hoverable'>
                <Link to={'/catalog/21'}><img src='dacha_banner.png' ></img></Link>
              </div>
              {/* <div class="card-content">
                <p>Дачный сезон совсем скоро. Вперед за покупками</p>
              </div>
              <div className="card-action">
                <a href="#">This is a link</a>
              </div> */}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
