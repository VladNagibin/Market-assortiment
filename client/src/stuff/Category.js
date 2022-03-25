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
    <Link to={'/catalog/'+category.Id} className='collection-item black-text category' id={category.Id} onMouseEnter={getChildCategories}>{category.name}</Link>
  )
}
