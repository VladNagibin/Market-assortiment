import React from 'react'

export default function Category({ category, clickCategory, openChild, parent }) {

  function OpenCaterogy() {
    clickCategory(category.Id, category.name)
  }
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
    <span id={category.Id} onMouseEnter={getChildCategories} onClick={OpenCaterogy} >{category.name}</span>
  )
}
