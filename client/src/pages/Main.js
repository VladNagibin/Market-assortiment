import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import TreeOfCategories from '../stuff/TreeOfCategories'
import Products from '../stuff/Products'

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
  return (
    <>
      <div className='container'>
        <div className='row'>
          <TreeOfCategories categories={categories} />
        </div>
      </div>
    </>
  )
}
