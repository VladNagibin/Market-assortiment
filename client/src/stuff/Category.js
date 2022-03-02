import React, { useState } from 'react'
import Categories from './Categories'
import { useHttp } from '../hooks/http.hook'
export default function Category({ category, clickCategory }) {
  let target = null
  const { request } = useHttp()
  const [childCategories, updateChildCategories] = useState([])
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  function OpenCaterogy() {
    clickCategory(category.Id, category.name)
  }
  function setChildCategories(e) {
    target = e.target
    request('/api/getCategory?id=' + category.Id).then(data=>{
      sleep(500).then(()=>{
        console.log(target)
        if(target!=null){
          updateChildCategories(data.result)
        }
      })
    })
    
    
  }
  function destroyChildCategories() {
    target = null
    console.log(target)
    updateChildCategories([])
  }

  return (
    <div onMouseEnter={setChildCategories} onMouseLeave={destroyChildCategories}>
      <label>
        <a onClick={OpenCaterogy} >{category.name}</a>
      </label>
      <Categories categories={childCategories} clickCategory={clickCategory} />
    </div>
  )
}
