import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'

export default function Category({ category, openChild, parent }) {

  // function OpenCaterogy() {
  //   clickCategory(category.Id, category.name)
  // }
  const {request} = useHttp()
  const [childCategories, setChildCategories] = useState([])
  function getChildCategories() {
    if (parent) {
      try {
        openChild(childCategories)
      } catch {
        console.log(category.Id)
      }
    }

  }
  async function downChild(){
    const data = await request('/api/getCategory?id=' + category.Id)
    if (data.result.length !== 0) {
      setChildCategories(data.result)
    } else {
      setChildCategories([])
    }
  }
  useEffect(() => {
   if(parent){
    downChild()
   }
    
  }, [])


  return (
    <Link to={'/catalog/' + category.Id} className='collection-item black-text category' id={category.Id} onMouseEnter={getChildCategories}>{category.name}</Link>
  )
}
