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
    <span id={category.Id} onMouseEnter={getChildCategories}><Link to={'/catalog/'+category.Id}>{category.name}</Link></span>
  )
}
