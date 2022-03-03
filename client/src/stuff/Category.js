import React, { useEffect, useState } from 'react'
import Categories from './Categories'
import { useHttp } from '../hooks/http.hook'
export default function Category({ category, clickCategory }) {
  let target = null
  const { request } = useHttp()
  const [childCategories, updateChildCategories] = useState([])
  const [drawChild, changeChild] = useState(false)
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  function OpenCaterogy() {
    clickCategory(category.Id, category.name)
  }
 
  return (
    <div id = {category.Id}>
      <label>
        <a onClick={OpenCaterogy} >{category.name}</a>
      </label>
      <Categories categories={childCategories} clickCategory={clickCategory} />
    </div>
  )
}
