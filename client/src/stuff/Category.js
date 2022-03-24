import React from 'react'
import { Link } from 'react-router-dom'

export default function Category({ category, openChild, parent }) {

  // function OpenCaterogy() {
  //   clickCategory(category.Id, category.name)
  // }
  function getChildCategories() {
    if (parent) {
      try {
        openChild(category.Id)
      } catch {
        console.log(category.Id)
      }
    }

  }



  return (
    <Link to={'/catalog/'+category.Id}><a className='collection-item' id={category.Id} onMouseEnter={getChildCategories}>{category.name}</a></Link>
  )
}
